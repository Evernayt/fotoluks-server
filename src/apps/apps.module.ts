import { AuthModule } from './../auth/auth.module';
import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from 'src/employees/employees.model';
import { AppsController } from './apps.controller';
import { App } from './apps.model';
import { AppsService } from './apps.service';
import { EmployeeApps } from './employee-apps.model';

@Module({
  controllers: [AppsController],
  providers: [AppsService],
  imports: [
    SequelizeModule.forFeature([App, Employee, EmployeeApps]),
    forwardRef(() => AuthModule),
  ],
})
export class AppsModule {}
