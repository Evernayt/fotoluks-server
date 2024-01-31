import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Report } from './reports.model';
import { CreateReportDto } from './dto/create-report.dto';
import { GetReportsDto } from './dto/get-reports.dto';
import { WhereOptions } from 'sequelize';
import { Op } from 'sequelize';
import { UpdateReportDto } from './dto/update-report.dto';
import { Employee } from 'src/employees/employees.model';

@Injectable()
export class ReportsService {
  constructor(@InjectModel(Report) private reportModel: typeof Report) {}

  // DESKTOP
  async createReport(createReportDto: CreateReportDto) {
    const report = await this.reportModel.create(createReportDto);
    return report;
  }

  // DESKTOP
  async getReports(getReportsDto: GetReportsDto) {
    let { limit, page, search } = getReportsDto;
    limit = Number(limit) || 1000;
    page = Number(page) || 1;
    const offset = page * limit - limit;

    let where: WhereOptions<Report>;

    if (search) {
      where = { description: { [Op.like]: `%${search}%` } };
    }

    const reports = await this.reportModel.findAndCountAll({
      limit,
      offset,
      distinct: true,
      order: [['id', 'DESC']],
      where,
      include: [
        {
          model: Employee,
          attributes: {
            exclude: ['password'],
          },
        },
      ],
    });
    return reports;
  }

  // DESKTOP
  async updateReport(updateReportDto: UpdateReportDto) {
    const { id } = updateReportDto;
    const report = await this.reportModel.update(updateReportDto, {
      where: { id },
    });

    return report;
  }
}
