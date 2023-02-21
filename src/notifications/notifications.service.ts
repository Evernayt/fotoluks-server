import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Employee } from 'src/employees/employees.model';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { GetNotificationsDto } from './dto/get-notifications.dto';
import { EmployeeNotifications } from './employee-notifications.model';
import { Notification } from './notifications.model';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification) private notificationModel: typeof Notification,
    @InjectModel(EmployeeNotifications)
    private employeeNotificationsModel: typeof EmployeeNotifications,
    private sequelize: Sequelize,
  ) {}

  // DESKTOP
  async createNotification(createNotificationDto: CreateNotificationDto) {
    const { title, text, employeeIds } = createNotificationDto;

    const t = await this.sequelize.transaction();
    try {
      const notification = await this.notificationModel.create(
        { title, text },
        { transaction: t },
      );

      const employeeNotificationsData = [];
      for (let i = 0; i < employeeIds.length; i++) {
        employeeNotificationsData.push({
          employeeId: employeeIds[i],
          notificationId: notification.id,
        });
      }
      await this.employeeNotificationsModel.bulkCreate(
        employeeNotificationsData,
        { transaction: t },
      );

      await t.commit();
      return notification;
    } catch (error) {
      await t.rollback();
    }
  }

  // DESKTOP
  async getNotifications(getNotificationsDto: GetNotificationsDto) {
    let { limit, page, employeeId } = getNotificationsDto;
    limit = Number(limit) || 1000;
    page = Number(page) || 1;
    const offset = page * limit - limit;

    let whereEmployee: any;
    if (employeeId) {
      whereEmployee = { id: employeeId };
    }

    const notifications = await this.notificationModel.findAndCountAll({
      limit,
      offset,
      distinct: true,
      order: [['id', 'DESC']],
      include: [
        {
          model: Employee,
          where: whereEmployee,
          attributes: [],
        },
      ],
    });

    return notifications;
  }

  // DESKTOP
  async deleteNotificationsByEmployeeId(employeeId: number) {
    const notifications = await this.employeeNotificationsModel.destroy({
      where: { employeeId },
    });

    return notifications;
  }
}
