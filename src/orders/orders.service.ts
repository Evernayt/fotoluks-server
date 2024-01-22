import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Transaction, WhereOptions } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Employee } from 'src/employees/employees.model';
import { OrderInfo } from 'src/order-infos/order-infos.model';
import { OrderMember } from 'src/order-members/order-members.model';
import { Shop } from 'src/shops/shops.model';
import { Status } from 'src/statuses/statuses.model';
import { User } from 'src/users/users.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { EditOrderShopDto } from './dto/edit-order-shop.dto';
import { EditOrderStatusDto } from './dto/edit-order-status.dto';
import { GetOrdersForExportDto } from './dto/get-orders-for-export.dto';
import { GetOrdersDto } from './dto/get-orders.dto';
import { Order } from './orders.model';
import { OrderProduct } from 'src/order-products/order-products.model';
import { Product } from 'src/products/products.model';
import correctSearch from 'src/common/helpers/correctSearch';
import { Literal } from 'sequelize/types/utils';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
    @InjectModel(OrderInfo) private orderInfoModel: typeof OrderInfo,
    @InjectModel(OrderProduct)
    private orderProductModel: typeof OrderProduct,
    @InjectModel(OrderMember) private orderMemberModel: typeof OrderMember,
    private sequelize: Sequelize,
  ) {}

  // DESKTOP
  async createOrder(createOrderDto: CreateOrderDto) {
    const {
      orderBody,
      orderInfoBody,
      orderProductsForCreateBody,
      orderProductsForUpdateBody,
      orderProductsForDeleteBody,
      orderMembersForCreateBody,
      orderMembersForDeleteBody,
    } = createOrderDto;

    const t = await this.sequelize.transaction();
    let order = null;
    let orderProducts = [];
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

      // CREATE ORDER PRODUCTS
      if (orderProductsForCreateBody.length > 0) {
        for (let i = 0; i < orderProductsForCreateBody.length; i++) {
          const orderProductBody = (orderProductsForCreateBody[i] = {
            ...orderProductsForCreateBody[i],
            orderId,
          });

          await this.orderProductModel.create(orderProductBody, {
            transaction: t,
          });
        }

        const whereOrderProduct: any = { orderId };
        orderProducts = await this.orderProductModel.findAll({
          where: whereOrderProduct,
          transaction: t,
          order: [['id', 'DESC']],
          include: [
            {
              model: Product,
            },
          ],
        });
      }

      // UPDATE ORDER PRODUCTS
      if (orderProductsForUpdateBody.length > 0) {
        for (let i = 0; i < orderProductsForUpdateBody.length; i++) {
          const orderProductBody = orderProductsForUpdateBody[i];

          await this.orderProductModel.update(orderProductBody, {
            where: { id: orderProductBody.id },
            transaction: t,
          });
        }
      }

      // DELETE ORDER PRODUCTS
      if (orderProductsForDeleteBody.length > 0) {
        await this.orderProductModel.destroy({
          where: { id: orderProductsForDeleteBody },
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
    return { order, orderProducts };
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
    //search = correctSearch(search);

    let where: WhereOptions<Order> = {};
    //let whereStatus: WhereOptions<Status>;
    //let whereShop: WhereOptions<Shop>;
    let whereEmployee: WhereOptions<Employee>;
    //let literalWhere: Literal;

    if (statusId && Number(statusId) !== 0) {
      where = { statusId };
    }

    if (shopIds) {
      shopIds = shopIds.map(Number);
      if (!shopIds.includes(0)) {
        where = { ...where, shopId: shopIds };
      }
    }

    if (startDate || endDate) {
      if (!endDate) {
        endDate = '9999-12-01T00:00';
      }
      where = { ...where, createdAt: { [Op.between]: [startDate, endDate] } };
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

        where = {
          [Op.or]: [
            {
              id: { [Op.or]: or },
            },
            {
              sum: { [Op.or]: or },
            },
            {
              comment: { [Op.or]: or },
            },
            {
              '$orderProducts.product.name$': { [Op.or]: or },
            },
            {
              '$user.name$': { [Op.or]: or },
            },
            {
              '$user.surname$': { [Op.or]: or },
            },
            {
              '$user.patronymic$': { [Op.or]: or },
            },
            {
              '$user.phone$': { [Op.or]: or },
            },
          ],
        };
      }
    }

    // if (search) {
    //   literalWhere = Sequelize.literal(
    //     `MATCH(order.comment) AGAINST('*${search}*' IN BOOLEAN MODE) OR
    //     MATCH(orderProducts.product.name) AGAINST('*${search}*' IN BOOLEAN MODE) OR
    //     MATCH(user.name, user.surname, user.patronymic, user.phone, user.email, user.vk, user.telegram)
    //     AGAINST('*${search}*' IN BOOLEAN MODE)`,
    //   );
    // }

    const orders = await this.orderModel.findAndCountAll({
      subQuery: search ? false : undefined,
      limit: search ? undefined : limit,
      offset: search ? undefined : offset,
      distinct: true,
      order: [['id', 'DESC']],
      where,
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
          model: OrderProduct,
          include: [
            {
              model: Product,
            },
          ],
        },
        {
          model: OrderInfo,
          include: [
            {
              model: Employee,
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
        [Op.between]: [startDate, endDate || '9999-12-01T00:00'],
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
          model: OrderProduct,
          include: [
            {
              model: Product,
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
      order: [['orderProducts', 'id', 'DESC']],
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
          model: OrderProduct,
          include: [
            {
              model: Product,
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
