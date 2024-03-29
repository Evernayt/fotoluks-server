import { Task } from 'src/tasks/tasks.model';
import { Employee } from 'src/employees/employees.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface TaskMessageCreationAttrs {
  message: string;
  taskId: number;
}

@Table({ tableName: 'task_message' })
export class TaskMessage extends Model<TaskMessage, TaskMessageCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID сообщения' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Привет', description: 'Сообщение' })
  @Column({ type: DataType.TEXT, allowNull: false })
  message: string;

  @ApiProperty({ example: 'false', description: 'Изменено или нет' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  edited: boolean;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER })
  employeeId: number;

  @ForeignKey(() => Task)
  @Column({ type: DataType.INTEGER })
  taskId: number;

  @BelongsTo(() => Employee, { foreignKey: 'employeeId' })
  employee: Employee;

  @BelongsTo(() => Task, { foreignKey: 'taskId' })
  task: Task;
}
