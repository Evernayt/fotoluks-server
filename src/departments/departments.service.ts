import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Department } from './departments.model';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { GetDepartmentsDto } from './dto/get-departments.dto';

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
    let { limit, page, archive } = getDepartmentsDto;
    limit = Number(limit) || 1000;
    page = Number(page) || 1;
    const offset = page * limit - limit;
    archive = String(archive) === 'true';

    const where = { archive };

    const departments = await this.departmentModel.findAndCountAll({
      limit,
      offset,
      where,
      distinct: true,
    });
    return departments;
  }
}
