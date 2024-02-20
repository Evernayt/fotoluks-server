import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Employee } from 'src/employees/employees.model';
import { Role } from './roles.model';

@Table({ tableName: 'employee_roles', createdAt: false, updatedAt: false })
export class EmployeeRoles extends Model<EmployeeRoles> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER })
  employeeId: number;
}
