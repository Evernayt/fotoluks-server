import { Task } from 'src/tasks/tasks.model';
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
import { EmployeeDepartments } from './employee-departments.model';

interface DepartmentCreationAttrs {
  name: string;
}

@Table({ tableName: 'departments', createdAt: false, updatedAt: false })
export class Department extends Model<Department, DepartmentCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID отдела' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Фото', description: 'Наименование отдела' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'false', description: 'В архиве или нет' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  archive: boolean;

  @BelongsToMany(() => Employee, () => EmployeeDepartments)
  employees: Employee[];

  @HasMany(() => Task, { foreignKey: 'departmentId' })
  tasks: Task[];
}
