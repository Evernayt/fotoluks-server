import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Notification } from 'src/notifications/notifications.model';

interface NotificationCategoryCreationAttrs {
  name: string;
}

@Table({ tableName: 'notification_categories' })
export class NotificationCategory extends Model<
  NotificationCategory,
  NotificationCategoryCreationAttrs
> {
  @ApiProperty({ example: 1, description: 'ID категории уведомления' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 'Добавлен или удален из участников',
    description: 'Наименование категории',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @HasMany(() => Notification, { foreignKey: 'notificationCategoryId' })
  notifications: Notification[];
}
