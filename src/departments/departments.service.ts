import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Department } from './departments.model';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { GetDepartmentsDto } from './dto/get-departments.dto';
import { Op } from 'sequelize';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department) private departmentModel: typeof Department,
  ) {}

  async createDepartment(createDepartmentDto: CreateDepartmentDto) {
    const department = await this.departmentModel.create(createDepartmentDto);
    return department;
  }

  async getDepartments(getDepartmentsDto: GetDepartmentsDto) {
    let { limit, page, isIncludeGeneral, archive } = getDepartmentsDto;
    limit = Number(limit) || 1000;
    page = Number(page) || 1;
    const offset = page * limit - limit;
    archive = String(archive) === 'true';
    isIncludeGeneral = String(isIncludeGeneral) === 'true';

    let where: any = { name: { [Op.ne]: 'Общий' }, archive };

    if (isIncludeGeneral) {
      where = { archive };
    }

    const departments = await this.departmentModel.findAndCountAll({
      limit,
      offset,
      where,
      distinct: true,
    });
    return departments;
  }
}
