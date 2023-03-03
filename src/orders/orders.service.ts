import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Employee } from 'src/employees/employees.model';
import { Feature } from 'src/features/features.model';
import { FinishedProduct } from 'src/finished-products/finished-products.model';
import { OrderInfo } from 'src/order-infos/order-infos.model';
import { OrderMember } from 'src/order-members/order-members.model';
import { Param } from 'src/params/params.model';
import { Product } from 'src/products/products.model';
import { SelectedParam } from 'src/selected-params/selected-params.model';
import { Shop } from 'src/shops/shops.model';
import { Status } from 'src/statuses/statuses.model';
import { Type } from 'src/types/types.model';
import { User } from 'src/users/users.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { EditOrderShopDto } from './dto/edit-order-shop.dto';
import { EditOrderStatusDto } from './dto/edit-order-status.dto';
import { GetOrdersForExportDto } from './dto/get-orders-for-export.dto';
import { GetOrdersDto } from './dto/get-orders.dto';
import { Order } from './orders.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
    @InjectModel(OrderInfo) private orderInfoModel: typeof OrderInfo,
    @InjectModel(FinishedProduct)
    private finishedProductModel: typeof FinishedProduct,
    @InjectModel(SelectedParam)
    private selectedParamModel: typeof SelectedParam,
    @InjectModel(OrderMember) private orderMemberModel: typeof OrderMember,
    private sequelize: Sequelize,
  ) {}

  // DESKTOP
  async createOrder(createOrderDto: CreateOrderDto) {
    const {
      orderBody,
      orderInfoBody,
      finishedProductsForCreateBody,
      finishedProductsForUpdateBody,
      finishedProductsForDeleteBody,
      orderMembersForCreateBody,
      orderMembersForDeleteBody,
    } = createOrderDto;

    const t = await this.sequelize.transaction();
    let order = null;
    let finishedProducts = [];
    try {
      // CREATE ORDER AND ORDER INFO
      if (orderBody.id === 0) {
        order = await this.orderModel.create(orderBody, { transaction: t });

        await this.orderInfoModel.create(
          {
            orderId: order.id,
            employeeId: orderInfoBody.employeeId,
            statusId: orderInfoBody.statusId,
          },
          { transaction: t },
        );
      } else {
        await this.orderModel.update(orderBody, {
          where: { id: orderBody.id },
          transaction: t,
        });

        order = { id: orderBody.id };
      }

      const orderId = orderBody.id === 0 ? order.id : orderBody.id;

      // CREATE FINISHED PRODUCTS
      if (finishedProductsForCreateBody.length > 0) {
        for (let i = 0; i < finishedProductsForCreateBody.length; i++) {
          const finishedProductBody = (finishedProductsForCreateBody[i] = {
            ...finishedProductsForCreateBody[i],
            orderId,
          });

          const createdFinishedProduct = await this.finishedProductModel.create(
            finishedProductBody,
            {
              transaction: t,
            },
          );

          // CREATE SELECTED PARAMS
          const selectedParamsBody = [];
          const selectedParams = finishedProductBody.selectedParams;

          for (let j = 0; j < selectedParams.length; j++) {
            selectedParamsBody[j] = {
              paramId: selectedParams[j].param.id,
              finishedProductId: createdFinishedProduct.id,
            };
          }

          await this.selectedParamModel.bulkCreate(selectedParamsBody, {
            transaction: t,
            ignoreDuplicates: true,
          });
        }

        const whereFinishedProduct: any = { orderId };
        finishedProducts = await this.finishedProductModel.findAll({
          where: whereFinishedProduct,
          transaction: t,
          order: [['id', 'DESC']],
          include: [
            {
              model: Product,
            },
            {
              model: Type,
              include: [
                {
                  model: Param,
                  through: {
                    attributes: [],
                  },
                  include: [
                    {
                      model: Feature,
                    },
                  ],
                },
              ],
            },
            {
              model: SelectedParam,
              include: [
                {
                  model: Param,
                  include: [
                    {
                      model: Feature,
                    },
                  ],
                },
              ],
            },
          ],
        });
      }

      // UPDATE FINISHED PRODUCTS
      if (finishedProductsForUpdateBody.length > 0) {
        for (let i = 0; i < finishedProductsForUpdateBody.length; i++) {
          const finishedProductBody = finishedProductsForUpdateBody[i];

          await this.finishedProductModel.update(finishedProductBody, {
            where: { id: finishedProductBody.id },
            transaction: t,
          });

          // CREATE, UPDATE OR DELETE SELECTED PARAMS
          const whereSelectedParam: any = {
            finishedProductId: finishedProductBody.id,
          };
          await this.selectedParamModel.destroy({
            where: whereSelectedParam,
            transaction: t,
          });

          const selectedParamsBody = [];
          const selectedParams = finishedProductBody.selectedParams;
          for (let j = 0; j < selectedParams.length; j++) {
            selectedParamsBody[j] = {
              paramId: selectedParams[j].param.id,
              finishedProductId: finishedProductBody.id,
            };
          }

          await this.selectedParamModel.bulkCreate(selectedParamsBody, {
            transaction: t,
            ignoreDuplicates: true,
          });
        }
      }

      // DELETE FINISHED PRODUCTS
      if (finishedProductsForDeleteBody.length > 0) {
        const whereFinishedProduct: any = {
          finishedProductId: finishedProductsForDeleteBody,
        };
        await this.selectedParamModel.destroy({
          where: whereFinishedProduct,
          transaction: t,
        });

        await this.finishedProductModel.destroy({
          where: { id: finishedProductsForDeleteBody },
          transaction: t,
        });
      }

      // CREATE ORDER MEMBERS
      if (orderMembersForCreateBody.length > 0) {
        const orderMembersBody = [];
        for (let i = 0; i < orderMembersForCreateBody.length; i++) {
          orderMembersBody[i] = {
            orderId,
            employeeId: orderMembersForCreateBody[i].employeeId,
          };
        }

        await this.orderMemberModel.bulkCreate(orderMembersBody, {
          transaction: t,
          ignoreDuplicates: true,
        });
      }

      // DELETE ORDER MEMBERS
      if (orderMembersForDeleteBody.length > 0) {
        const whereOrderMember: any = {
          employeeId: orderMembersForDeleteBody,
          orderId,
        };
        await this.orderMemberModel.destroy({
          where: whereOrderMember,
          transaction: t,
        });
      }

      order = await this.getOrder(orderId, t);

      await t.commit();
    } catch (error) {
      await t.rollback();
    }
    return { order, finishedProducts };
  }

  // DESKTOP
  async getOrders(getOrdersDto: GetOrdersDto) {
    let {
      limit,
      page,
      statusId,
      shopIds,
      startDate,
      endDate,
      employeeId,
      search,
    } = getOrdersDto;

    limit = Number(limit) || 1000;
    page = Number(page) || 1;
    const offset = page * limit - limit;

    let whereOrder: any;
    let whereEmployee: any;

    if (statusId && Number(statusId) !== 0) {
      whereOrder = { statusId };
    }

    if (shopIds) {
      shopIds = shopIds.map(Number);
      if (!shopIds.includes(0)) {
        whereOrder = { ...whereOrder, shopId: shopIds };
      }
    }

    if (startDate || endDate) {
      whereOrder = {
        ...whereOrder,
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      };
    }

    if (employeeId) {
      whereEmployee = { id: employeeId };
    }

    if (search) {
      const words = search.match(/[^ ]+/g);
      if (words) {
        const or = [];
        words.forEach((word) => {
          or.push({ [Op.like]: `%${word}%` });
        });

        const whereSearch = {
          [Op.or]: [
            {
              id: {
                [Op.or]: or,
              },
            },
            {
              sum: {
                [Op.or]: or,
              },
            },
            {
              '$finishedProducts.product.name$': {
                [Op.or]: or,
              },
            },
            {
              '$finishedProducts.type.name$': {
                [Op.or]: or,
              },
            },
            {
              '$user.name$': {
                [Op.or]: or,
              },
            },
          ],
        };

        whereOrder = { ...whereOrder, ...whereSearch };
      }
    }

    const orders = await this.orderModel.findAndCountAll({
      subQuery: search ? false : undefined,
      limit: search ? undefined : limit,
      offset: search ? undefined : offset,
      where: whereOrder,
      distinct: true,
      order: [['id', 'DESC']],
      include: [
        {
          model: User,
        },
        {
          model: OrderMember,
          include: [
            {
              model: Employee,
              where: whereEmployee,
              attributes: {
                exclude: ['password'],
              },
            },
          ],
        },
        {
          model: Status,
        },
        {
          model: Shop,
        },
        {
          model: FinishedProduct,
          include: [
            {
              model: Product,
            },
            {
              model: Type,
            },
          ],
        },
      ],
    });
    return orders;
  }

  // DESKTOP
  async getOrdersForExport(getOrdersForExportDto: GetOrdersForExportDto) {
    const { shopId, startDate, endDate } = getOrdersForExportDto;

    const where: any = {
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
      shopId,
    };

    const orders = await this.orderModel.findAll({
      where,
      order: [['id', 'DESC']],
      include: [
        {
          model: OrderInfo,
          include: [
            {
              model: Employee,
            },
            {
              model: Status,
            },
          ],
        },
        {
          model: FinishedProduct,
          include: [
            {
              model: Product,
            },
            {
              model: Type,
            },
          ],
        },
      ],
    });
    return orders;
  }

  // DESKTOP
  async getOrder(orderId: number, transaction?: Transaction) {
    const order = await this.orderModel.findOne({
      where: { id: orderId },
      transaction,
      order: [['finishedProducts', 'id', 'DESC']],
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
        },
        {
          model: OrderMember,
          include: [
            {
              model: Employee,
              attributes: {
                exclude: ['password'],
              },
            },
          ],
        },
        {
          model: Status,
        },
        {
          model: Shop,
        },
        {
          model: FinishedProduct,
          include: [
            {
              model: Product,
            },
            {
              model: Type,
              include: [
                {
                  model: Param,
                  through: {
                    attributes: [],
                  },
                  include: [
                    {
                      model: Feature,
                    },
                  ],
                },
              ],
            },
            {
              model: SelectedParam,
              include: [
                {
                  model: Param,
                  include: [
                    {
                      model: Feature,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    return order;
  }

  // DESKTOP
  async editOrderShop(editOrderShopDto: EditOrderShopDto) {
    const { orderId, shopId } = editOrderShopDto;

    const data: any = { shopId };

    const order = await this.orderModel.update(data, {
      where: { id: orderId },
    });
    return order;
  }

  // DESKTOP
  async editOrderStatus(editOrderStatusDto: EditOrderStatusDto) {
    const { orderId, statusId } = editOrderStatusDto;

    await this.orderInfoModel.create(editOrderStatusDto);

    const data: any = { statusId };
    const order = await this.orderModel.update(data, {
      where: { id: orderId },
    });
    return order;
  }
}
