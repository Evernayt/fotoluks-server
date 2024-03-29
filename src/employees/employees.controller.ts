import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Employee } from './employees.model';
import { EmployeesService } from './employees.service';
import { AddAppDto } from './dto/add-app.dto';
import { AddDepartmentDto } from './dto/add-department.dto';
import { GetEmployeesDto } from './dto/get-employees.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { UpdateEmployeePasswordDto } from './dto/update-employee-password.dto';
import { AddRoleDto } from './dto/add-role.dto';

@ApiTags('Сотрудники')
@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @ApiOperation({ summary: 'Получение сотрудников' })
  @ApiResponse({ status: 200, type: [Employee] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Query() getEmployeesDto: GetEmployeesDto) {
    return this.employeesService.getEmployees(getEmployeesDto);
  }

  @ApiOperation({ summary: 'Получить сотрудника' })
  @ApiResponse({ status: 200, type: Employee })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.employeesService.getEmployee(id);
  }

  @ApiOperation({ summary: 'Добавить роль' })
  @ApiResponse({ status: 200, type: Employee })
  @UseGuards(JwtAuthGuard)
  @Post('role')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.employeesService.addRole(addRoleDto);
  }

  @ApiOperation({ summary: 'Дать доступ к приложениям' })
  @ApiResponse({ status: 200, type: Employee })
  @UseGuards(JwtAuthGuard)
  @Post('app')
  addApp(@Body() addAppDto: AddAppDto) {
    return this.employeesService.addApp(addAppDto);
  }

  @ApiOperation({ summary: 'Добавить в отделы' })
  @ApiResponse({ status: 200, type: Employee })
  @UseGuards(JwtAuthGuard)
  @Post('department')
  addDepartment(@Body() addDepartmentDto: AddDepartmentDto) {
    return this.employeesService.addDepartment(addDepartmentDto);
  }

  @ApiOperation({ summary: 'Изменить сотрудника' })
  @ApiResponse({ status: 200, type: Employee })
  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.updateEmployee(updateEmployeeDto);
  }

  @ApiOperation({ summary: 'Изменить пароль сотрудника' })
  @ApiResponse({ status: 200, type: Employee })
  @UseGuards(JwtAuthGuard)
  @Put('password')
  updatePassword(@Body() updateEmployeePasswordDto: UpdateEmployeePasswordDto) {
    return this.employeesService.updateEmployeePassword(
      updateEmployeePasswordDto,
    );
  }
}
