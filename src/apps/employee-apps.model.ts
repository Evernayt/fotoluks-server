import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Employee } from 'src/employees/employees.model';
import { App } from './apps.model';

@Table({ tableName: 'employee_apps', createdAt: false, updatedAt: false })
export class EmployeeApps extends Model<EmployeeApps> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => App)
  @Column({ type: DataType.INTEGER })
  appId: number;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER })
  employeeId: number;
}
