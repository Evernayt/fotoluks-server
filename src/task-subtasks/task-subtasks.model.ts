import { Task } from 'src/tasks/tasks.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

interface TaskSubtaskCreationAttrs {
  text: string;
  taskId: number;
}

@Table({ tableName: 'task_subtask' })
export class TaskSubtask extends Model<TaskSubtask, TaskSubtaskCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID подзадачи' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Подзача №1', description: 'Текст подзадачи' })
  @Column({ type: DataType.TEXT, allowNull: false })
  text: string;

  @ApiProperty({ example: 'false', description: 'Завершено или нет' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  completed: boolean;

  @BelongsTo(() => Task, { foreignKey: 'taskId' })
  task: Task;
}
