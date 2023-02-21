import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Employee } from 'src/employees/employees.model';
import { Notification } from './notifications.model';

@Table({
  tableName: 'employee_notifications',
  createdAt: false,
  updatedAt: false,
})
export class EmployeeNotifications extends Model<EmployeeNotifications> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Notification)
  @Column({ type: DataType.INTEGER })
  notificationId: number;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER })
  employeeId: number;
}
