import { AuthModule } from './../auth/auth.module';
import { Module, forwardRef } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Department } from './departments.model';
import { Employee } from 'src/employees/employees.model';
import { EmployeeDepartments } from './employee-departments.model';

@Module({
  providers: [DepartmentsService],
  controllers: [DepartmentsController],
  imports: [
    SequelizeModule.forFeature([Department, Employee, EmployeeDepartments]),
    forwardRef(() => AuthModule),
  ],
})
export class DepartmentsModule {}
