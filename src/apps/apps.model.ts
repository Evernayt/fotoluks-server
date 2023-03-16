import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Employee } from 'src/employees/employees.model';
import { Notification } from 'src/notifications/notifications.model';
import { EmployeeApps } from './employee-apps.model';

interface AppCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'apps', createdAt: false, updatedAt: false })
export class App extends Model<App, AppCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID приложения' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'ORDERS', description: 'Приложение' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({ example: 'Заказы', description: 'Описание приложения' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @HasMany(() => Notification, { foreignKey: 'appId' })
  notifications: Notification[];

  @BelongsToMany(() => Employee, () => EmployeeApps)
  employees: Employee[];
}
