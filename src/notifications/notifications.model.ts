import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { App } from 'src/apps/apps.model';
import { Employee } from 'src/employees/employees.model';
import { EmployeeNotifications } from './employee-notifications.model';
import { NotificationCategory } from 'src/notification-categories/notification-categories.model';

interface NotificationCreationAttrs {
  title: string;
  text: string;
  appId: number;
  notificationCategoryId: number;
}

@Table({ tableName: 'notifications' })
export class Notification extends Model<
  Notification,
  NotificationCreationAttrs
> {
  @ApiProperty({ example: 1, description: 'ID уведомления' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Изменен статус', description: 'Заголовок' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({
    example: 'Иван изменил статус заказа № 137 c "Новый" на "В работе"',
    description: 'Текст уведомления',
  })
  @Column({ type: DataType.TEXT, allowNull: false })
  text: string;

  @ForeignKey(() => App)
  @Column({ type: DataType.INTEGER })
  appId: number;

  @ForeignKey(() => NotificationCategory)
  @Column({ type: DataType.INTEGER })
  notificationCategoryId: number;

  @BelongsTo(() => App, { foreignKey: 'appId' })
  app: App;

  @BelongsTo(() => NotificationCategory, {
    foreignKey: 'notificationCategoryId',
  })
  notificationCategory: NotificationCategory;

  @BelongsToMany(() => Employee, () => EmployeeNotifications)
  employees: Employee[];
}
