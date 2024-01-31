import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, WhereOptions } from 'sequelize';
import { Employee } from 'src/employees/employees.model';
import { Status } from 'src/statuses/statuses.model';
import { GetOrderInfosDto } from './dto/get-order-infos.dto';
import { GetStatisticsDto } from './dto/get-statistics.dto';
import { OrderInfo } from './order-infos.model';

@Injectable()
export class OrderInfosService {
  constructor(
    @InjectModel(OrderInfo) private orderInfoModel: typeof OrderInfo,
  ) {}

  // DESKTOP
  async getOrderInfos(getOrderInfosDto: GetOrderInfosDto) {
    let { limit, page, orderId } = getOrderInfosDto;
    limit = Number(limit) || 1000;
    page = Number(page) || 1;
    const offset = page * limit - limit;

    let where: WhereOptions<OrderInfo>;

    if (orderId) {
      where = { orderId };
    }

    const orderInfos = await this.orderInfoModel.findAndCountAll({
      limit,
      offset,
      where,
      distinct: true,
      order: [['id', 'DESC']],
      include: [
        {
          model: Status,
        },
        {
          model: Employee,
          attributes: {
            exclude: ['password'],
          },
        },
      ],
    });
    return orderInfos;
  }

  // DESKTOP
  async getStatistics(getStatisticsDto: GetStatisticsDto) {
    const { employeeId, startDate, endDate } = getStatisticsDto;

    const where: WhereOptions<OrderInfo> = {
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    };

    const orderInfos = await this.orderInfoModel.findAndCountAll({
      where,
      distinct: true,
      group: ['status.id'],
      include: [
        {
          model: Status,
        },
        {
          model: Employee,
          where: { id: employeeId },
          attributes: [],
        },
      ],
    });
    return orderInfos;
  }
}
