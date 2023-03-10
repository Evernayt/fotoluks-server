import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Employee } from 'src/employees/employees.model';
import { EmployeeNotifications } from './employee-notifications.model';

interface NotificationCreationAttrs {
  title: string;
  text: string;
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

  @BelongsToMany(() => Employee, () => EmployeeNotifications)
  employees: Employee[];
}
