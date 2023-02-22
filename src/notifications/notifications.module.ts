import { AuthModule } from './../auth/auth.module';
import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from 'src/employees/employees.model';
import { EmployeeNotifications } from './employee-notifications.model';
import { NotificationsController } from './notifications.controller';
import { Notification } from './notifications.model';
import { NotificationsService } from './notifications.service';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  imports: [
    SequelizeModule.forFeature([Notification, Employee, EmployeeNotifications]),
    forwardRef(() => AuthModule),
  ],
})
export class NotificationsModule {}
