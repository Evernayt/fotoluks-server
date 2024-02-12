import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderFile } from './order-files.model';
import { CreateOrderFileDto } from './dto/create-order-file.dto';
import { GetOrderFilesDto } from './dto/get-order-files.dto';
import { WhereOptions } from 'sequelize';
import { Op } from 'sequelize';

@Injectable()
export class OrderFilesService {
  constructor(
    @InjectModel(OrderFile) private orderFileModel: typeof OrderFile,
  ) {}

  // DESKTOP
  async createOrderFiles(createOrderFileDto: CreateOrderFileDto[]) {
    const orderFiles = await this.orderFileModel.bulkCreate(
      createOrderFileDto,
      { ignoreDuplicates: true },
    );
    return orderFiles;
  }

  // DESKTOP
  async getOrderFiles(getOrderFilesDto: GetOrderFilesDto) {
    let { limit, page, search } = getOrderFilesDto;
    limit = Number(limit) || 1000;
    page = Number(page) || 1;
    const offset = page * limit - limit;

    let where: WhereOptions<OrderFile>;

    if (search) {
      where = { link: { [Op.like]: `%${search}%` } };
    }

    const orderFiles = await this.orderFileModel.findAndCountAll({
      limit,
      offset,
      distinct: true,
      order: [['id', 'DESC']],
      where,
    });
    return orderFiles;
  }
}
