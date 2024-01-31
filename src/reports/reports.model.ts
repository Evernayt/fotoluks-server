import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Employee } from 'src/employees/employees.model';

interface ReportCreationAttrs {
  description: string;
  completed: boolean;
  employeeId: number;
}

@Table({ tableName: 'reports' })
export class Report extends Model<Report, ReportCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID отзыва' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: '', description: 'Описание' })
  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @ApiProperty({ example: 'false', description: 'Завершено или нет' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  completed: boolean;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER })
  employeeId: number;

  @BelongsTo(() => Employee, { foreignKey: 'employeeId' })
  employee: Employee;
}
