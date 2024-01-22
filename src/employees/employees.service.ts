import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Sequelize, WhereOptions } from 'sequelize';
import { App } from 'src/apps/apps.model';
import { Department } from 'src/departments/departments.model';
import { AddAppDto } from './dto/add-app.dto';
import { AddDepartmentDto } from './dto/add-department.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { GetEmployeesDto } from './dto/get-employees.dto';
import { UpdateEmployeePasswordDto } from './dto/update-employee-password.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './employees.model';
import * as bcrypt from 'bcryptjs';
import { EmployeeApps } from 'src/apps/employee-apps.model';
import { EmployeeDepartments } from 'src/departments/employee-departments.model';
import { Role } from 'src/roles/roles.model';
import { Literal } from 'sequelize/types/utils';
import correctSearch from 'src/common/helpers/correctSearch';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee) private employeeModel: typeof Employee,
    @InjectModel(EmployeeApps) private employeeAppsModel: typeof EmployeeApps,
    @InjectModel(EmployeeDepartments)
    private employeeDepartmentsModel: typeof EmployeeDepartments,
  ) {}

  async createEmployee(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeModel.create(createEmployeeDto);
    return employee;
  }

  // DESKTOP
  async getEmployees(getEmployeesDto: GetEmployeesDto) {
    let { limit, page, archive, search, appId, roleIds } = getEmployeesDto;
    limit = Number(limit) || 1000;
    page = Number(page) || 1;
    const offset = page * limit - limit;
    archive = String(archive) === 'true';
    search = correctSearch(search);

    let where: WhereOptions<Employee> = { archive };
    let whereApp: WhereOptions<App>;
    let whereRole: WhereOptions<Role>;
    let literalWhere: Literal;

    if (appId) {
      whereApp = { id: appId };
    }

    if (roleIds) {
      roleIds = roleIds.map(Number);
      if (!roleIds.includes(0)) {
        whereRole = { id: roleIds };
      }
    }

    if (search) {
      literalWhere = Sequelize.literal(
        `MATCH(Employee.name, surname, login) AGAINST('*${search}*' IN BOOLEAN MODE)`,
      );
    }

    const employees = await this.employeeModel.findAndCountAll({
      limit,
      offset,
      distinct: true,
      where: [where, literalWhere],
      include: [
        {
          model: App,
          where: whereApp,
        },
        {
          model: Department,
        },
        {
          model: Role,
          where: whereRole,
        },
      ],
    });
    return employees;
  }

  async getEmployeeByLogin(login: string) {
    const employee = await this.employeeModel.findOne({
      where: { login },
      include: [
        {
          model: App,
        },
        {
          model: Department,
        },
        {
          model: Role,
        },
      ],
    });
    return employee;
  }

  // DESKTOP
  async getEmployee(id: number) {
    const employee = await this.employeeModel.findOne({
      where: { id: id },
      include: [
        {
          model: App,
        },
        {
          model: Department,
        },
        {
          model: Role,
        },
      ],
    });
    return employee;
  }

  async addApp(addAppDto: AddAppDto) {
    const { employeeId, appIds } = addAppDto;

    const employee = await this.employeeModel.findByPk(employeeId);

    if (employee) {
      await this.employeeAppsModel.destroy({ where: { employeeId } });
      await employee.$add('app', appIds);
      return addAppDto;
    }
    throw new HttpException('Сотрудник не найден', HttpStatus.NOT_FOUND);
  }

  async addDepartment(addDepartmentDto: AddDepartmentDto) {
    const { employeeId, departmentIds } = addDepartmentDto;

    const employee = await this.employeeModel.findByPk(employeeId);

    if (employee) {
      await this.employeeDepartmentsModel.destroy({ where: { employeeId } });
      await employee.$add('department', departmentIds);
      return addDepartmentDto;
    }
    throw new HttpException('Сотрудник не найден', HttpStatus.NOT_FOUND);
  }

  // DESKTOP
  async updateEmployee(updateEmployeeDto: UpdateEmployeeDto) {
    const { id, login } = updateEmployeeDto;

    if (login) {
      const candidate = await this.employeeModel.findOne({
        where: {
          id: { [Op.ne]: id },
          login,
        },
      });
      if (candidate) {
        throw new HttpException(
          'Сотрудник с таким логином уже существует',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    await this.employeeModel.update(updateEmployeeDto, {
      where: { id },
    });

    const updatedEmployee = await this.getEmployee(id);

    return updatedEmployee;
  }

  // DESKTOP
  async updateEmployeePassword(
    updateEmployeePasswordDto: UpdateEmployeePasswordDto,
  ) {
    const { id, oldPassword, newPassword } = updateEmployeePasswordDto;

    const employee = await this.employeeModel.findOne({ where: { id } });

    const passwordEquals = await bcrypt.compare(oldPassword, employee.password);
    if (!passwordEquals) {
      throw new HttpException(
        'Введен неверный старый пароль',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(newPassword, 5);
    await this.employeeModel.update(
      { password: hashPassword },
      { where: { id } },
    );

    return employee;
  }
}
