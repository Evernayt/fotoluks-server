import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Department } from './departments.model';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { GetDepartmentsDto } from './dto/get-departments.dto';

@ApiTags('Отделы')
@Controller('departments')
export class DepartmentsController {
  constructor(private departmentsService: DepartmentsService) {}

  @ApiOperation({ summary: 'Создание отдела' })
  @ApiResponse({ status: 200, type: Department })
  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.createDepartment(createDepartmentDto);
  }

  @ApiOperation({ summary: 'Получить отделы' })
  @ApiResponse({ status: 200, type: [Department] })
  @Get()
  getAll(@Query() getDepartmentsDto: GetDepartmentsDto) {
    return this.departmentsService.getDepartments(getDepartmentsDto);
  }
}
