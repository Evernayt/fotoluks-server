import { forwardRef, Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from './employees.model';
import { AuthModule } from 'src/auth/auth.module';
import { EmployeeApps } from 'src/apps/employee-apps.model';
import { AppsModule } from 'src/apps/apps.module';
import { App } from 'src/apps/apps.model';
import { Department } from 'src/departments/departments.model';
import { EmployeeDepartments } from 'src/departments/employee-departments.model';
import { DepartmentsModule } from 'src/departments/departments.module';
import { Notification } from 'src/notifications/notifications.model';
import { EmployeeNotifications } from 'src/notifications/employee-notifications.model';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  providers: [EmployeesService],
  controllers: [EmployeesController],
  imports: [
    SequelizeModule.forFeature([
      Employee,
      App,
      EmployeeApps,
      Department,
      EmployeeDepartments,
      Notification,
      EmployeeNotifications,
    ]),
    AppsModule,
    DepartmentsModule,
    NotificationsModule,
    forwardRef(() => AuthModule),
  ],
  exports: [EmployeesService],
})
export class EmployeesModule {}
