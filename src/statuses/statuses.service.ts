import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStatusDto } from './dto/create-status.dto';
import { GetStatusesDto } from './dto/get-statuses.dto';
import { Status } from './statuses.model';

@Injectable()
export class StatusesService {
  constructor(@InjectModel(Status) private statusModel: typeof Status) {}

  // DESKTOP
  async createStatus(createStatusDto: CreateStatusDto) {
    const status = await this.statusModel.create(createStatusDto);
    return status;
  }

  // DESKTOP
  async getStatuses(getStatusesDto: GetStatusesDto) {
    let { limit, page } = getStatusesDto;
    limit = Number(limit) || 1000;
    page = Number(page) || 1;
    const offset = page * limit - limit;

    const statuses = await Status.findAndCountAll({
      limit,
      offset,
      distinct: true,
    });

    return statuses;
  }
}
