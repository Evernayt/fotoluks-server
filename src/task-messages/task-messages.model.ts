import { Task } from 'src/tasks/tasks.model';
import { Employee } from 'src/employees/employees.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
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
  @Column({ type: DataType.STRING, allowNull: false })
  message: string;

  @BelongsTo(() => Employee, { foreignKey: 'employeeId' })
  employee: Employee;

  @BelongsTo(() => Task, { foreignKey: 'taskId' })
  task: Task;
}
