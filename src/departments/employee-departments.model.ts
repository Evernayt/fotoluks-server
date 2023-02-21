import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Employee } from 'src/employees/employees.model';
import { Department } from './departments.model';

@Table({
  tableName: 'employee_departments',
  createdAt: false,
  updatedAt: false,
})
export class EmployeeDepartments extends Model<EmployeeDepartments> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Department)
  @Column({ type: DataType.INTEGER })
  departmentId: number;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER })
  employeeId: number;
}
