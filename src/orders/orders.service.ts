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
import { ICreatedOrderProductId } from './models/ICreatedOrderProductId';
import { OrderFile } from 'src/order-files/order-files.model';
import { IFile } from 'src/files/models/IFile';
import { v4 as uuidv4 } from 'uuid';
import { writeFile, rm } from 'fs/promises';
import * as path from 'path';
import * as fs from 'fs';
import { CreateOrderFileDto } from 'src/order-files/dto/create-order-file.dto';
import fileNameToUTF8 from 'src/common/helpers/fileNameToUTF8';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
    @InjectModel(OrderInfo) private orderInfoModel: typeof OrderInfo,
    @InjectModel(OrderProduct)
    private orderProductModel: typeof OrderProduct,
    @InjectModel(OrderMember) private orderMemberModel: typeof OrderMember,
    @InjectModel(OrderFile) private orderFileModel: typeof OrderFile,
    private sequelize: Sequelize,
  ) {}

  // DESKTOP
  async createOrder(
    createOrderDto: CreateOrderDto | { createOrderDto: string },
    files: IFile[],
  ) {
    let data: CreateOrderDto;
    if ('createOrderDto' in createOrderDto) {
      data = JSON.parse(createOrderDto.createOrderDto);
    } else {
      data = createOrderDto;
    }
    const {
      orderBody,
      orderInfoBody,
      orderProductsForCreateBody,
      orderProductsForUpdateBody,
      orderProductsForDeleteBody,
      orderMembersForCreateBody,
      orderMembersForDeleteBody,
      orderFilesForDeleteBody,
    } = data;

    const DOMAIN_LINK = `http://${process.env.HOST}:${process.env.PORT}`;
    const t = await this.sequelize.transaction();
    let order = null;
    const createdOrderProductIds: ICreatedOrderProductId[] = [];
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

      // DELETE ORDER FILES
      if (orderFilesForDeleteBody?.length > 0) {
        const whereOrderFile: WhereOptions<OrderFile> = {
          id: orderFilesForDeleteBody,
        };

        const orderFiles = await this.orderFileModel.findAll({
          where: whereOrderFile,
          transaction: t,
        });
        const staticPath = path.join(__dirname, '../..', 'static');
        for (const orderFile of orderFiles) {
          const filePath = orderFile.link.replace(DOMAIN_LINK, '');
          const fullFilePath = path.join(staticPath, filePath);
          await rm(fullFilePath, { force: true });
        }

        await this.orderFileModel.destroy({
          where: whereOrderFile,
          transaction: t,
        });
      }

      // CREATE ORDER PRODUCTS
      if (orderProductsForCreateBody?.length > 0) {
        for (const orderProductForCreateBody of orderProductsForCreateBody) {
          const orderProductBody = {
            ...orderProductForCreateBody,
            id: null,
            orderId,
          };

          const orderProduct = await this.orderProductModel.create(
            orderProductBody,
            { transaction: t },
          );

          createdOrderProductIds.push({
            old: orderProductForCreateBody.id,
            new: orderProduct.id,
          });
        }
      }

      // UPDATE ORDER PRODUCTS
      if (orderProductsForUpdateBody?.length > 0) {
        for (let i = 0; i < orderProductsForUpdateBody.length; i++) {
          const orderProductBody = {
            ...orderProductsForUpdateBody[i],
            id: orderProductsForUpdateBody[i].id as number,
          };

          await this.orderProductModel.update(orderProductBody, {
            where: { id: orderProductBody.id },
            transaction: t,
          });
        }
      }

      // DELETE ORDER PRODUCTS
      if (orderProductsForDeleteBody?.length > 0) {
        await this.orderProductModel.destroy({
          where: { id: orderProductsForDeleteBody },
          transaction: t,
        });
      }

      // CREATE ORDER MEMBERS
      if (orderMembersForCreateBody?.length > 0) {
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
      if (orderMembersForDeleteBody?.length > 0) {
        const whereOrderMember: WhereOptions<OrderMember> = {
          employeeId: orderMembersForDeleteBody,
          orderId,
        };
        await this.orderMemberModel.destroy({
          where: whereOrderMember,
          transaction: t,
        });
      }

      // CREATE ORDER FILES
      if (files?.length > 0) {
        const orderPath = path.join(
          __dirname,
          '../..',
          'static/orders',
          `${orderId}`,
        );
        if (!fs.existsSync(orderPath)) {
          fs.mkdirSync(orderPath, { recursive: true });
        }

        const orderFiles: CreateOrderFileDto[] = [];
        for (const file of files) {
          file.originalname = fileNameToUTF8(file.originalname);
          const shortUUID = uuidv4().split('-')[0];
          const originalname = file.originalname.split(':')[0];
          const oldOrderProductId = file.originalname.split(':')[1];
          const orderProductId =
            createdOrderProductIds.find((x) => x.old == oldOrderProductId)
              ?.new || Number(oldOrderProductId);

          const fileName = path.parse(originalname).name;
          const fileExtension = path.parse(originalname).ext;
          const newFileName = `${fileName}_${shortUUID}${fileExtension}`;

          const link = `${DOMAIN_LINK}/orders/${orderId}/${newFileName}`;
          orderFiles.push({
            link,
            name: newFileName,
            size: file.size,
            orderProductId,
            orderId,
          });

          await writeFile(path.join(orderPath, newFileName), file.buffer);
        }

        await this.orderFileModel.bulkCreate(orderFiles, {
          transaction: t,
          ignoreDuplicates: true,
        });
      }

      order = await this.getOrder(orderId, t);

      await t.commit();
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
    return { order };
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
    search = correctSearch(search);

    let where: WhereOptions<Order> = {};
    let whereStatus: WhereOptions<Status>;
    let whereShop: WhereOptions<Shop>;
    let whereOrderMember: WhereOptions<OrderMember>;
    let literalWhere: Literal;

    if (statusId && Number(statusId) !== 0) {
      if (Number(statusId) === 6) {
        whereStatus = { id: [1, 2, 3] };
      } else {
        whereStatus = { id: statusId };
      }
    }

    if (shopIds) {
      shopIds = shopIds.map(Number);
      if (!shopIds.includes(0)) {
        whereShop = { id: shopIds };
      }
    }

    if (startDate || endDate) {
      if (!endDate) {
        endDate = '9999-12-01T00:00';
      }
      where = { ...where, createdAt: { [Op.between]: [startDate, endDate] } };
    }

    if (employeeId) {
      whereOrderMember = { employeeId };
    }

    if (search) {
      literalWhere = Sequelize.literal(
        `MATCH(Order.comment) AGAINST('*${search}*' IN BOOLEAN MODE) OR
        MATCH(\`orderProducts->product\`.name) AGAINST('*${search}*' IN BOOLEAN MODE) OR
        MATCH(user.name, user.surname, user.patronymic, user.phone, user.email, user.vk, user.telegram)
        AGAINST('*${search}*' IN BOOLEAN MODE) OR Order.id='${search}' OR Order.sum='${search}'`,
      );
    }

    const orders = await this.orderModel.findAndCountAll({
      subQuery: search ? false : undefined,
      limit,
      offset,
      distinct: true,
      order: [['id', 'DESC']],
      where: [where, literalWhere],
      include: [
        {
          model: User,
        },
        {
          model: OrderMember,
          where: whereOrderMember,
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
          where: whereStatus,
        },
        {
          model: Shop,
          where: whereShop,
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

    const where: WhereOptions<Order> = {
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
        {
          model: OrderFile,
          include: [
            {
              model: OrderProduct,
              attributes: ['id'],
              include: [
                {
                  model: Product,
                  attributes: ['name'],
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
