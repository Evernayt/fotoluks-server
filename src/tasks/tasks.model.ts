import { TaskMember } from './../task-members/task-members.model';
import { TaskMessage } from './../task-messages/task-messages.model';
import { Shop } from 'src/shops/shops.model';
import { Department } from 'src/departments/departments.model';
import { Employee } from 'src/employees/employees.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { TaskSubtask } from 'src/task-subtasks/task-subtasks.model';

interface TaskCreationAttrs {
  title: string;
  description: string;
  urgent: boolean;
  creatorId: number;
  completedDate: null;
}

@Table({
  tableName: 'tasks',
  indexes: [{ type: 'FULLTEXT', fields: ['title', 'description'] }],
})
export class Task extends Model<Task, TaskCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID задачи' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Что не так', description: 'Заголовок задачи' })
  @Column({ type: DataType.TEXT, allowNull: false })
  title: string;

  @ApiProperty({ example: 'Что сделать', description: 'Описание задачи' })
  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @ApiProperty({ example: 'false', description: 'Срочно или нет' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  urgent: boolean;

  @ApiProperty({ example: 'false', description: 'Личное или нет' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  personal: boolean;

  @ApiProperty({ example: 'false', description: 'Завершено или нет' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  completed: boolean;

  @ApiProperty({
    example: '2022-09-04 16:45:00',
    description: 'Дата завершения',
  })
  @Column({ type: DataType.DATE })
  completedDate: string;

  @ApiProperty({ example: 'Примечание', description: 'Примечание завершения' })
  @Column({ type: DataType.TEXT, allowNull: false })
  completionNote: string;

  @ApiProperty({ example: 'false', description: 'В архиве или нет' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  archive: boolean;

  @ForeignKey(() => Shop)
  @Column({ type: DataType.INTEGER })
  shopId: number;

  @ForeignKey(() => Department)
  @Column({ type: DataType.INTEGER })
  departmentId: number;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER })
  creatorId: number;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER })
  executorId: number;

  @BelongsTo(() => Shop)
  shop: Shop;

  @BelongsTo(() => Department, { foreignKey: 'departmentId' })
  department: Department;

  @BelongsTo(() => Employee, { foreignKey: 'creatorId' })
  creator: Employee;

  @BelongsTo(() => Employee, { foreignKey: 'executorId' })
  executor: Employee;

  @HasMany(() => TaskMember, { foreignKey: 'taskId' })
  taskMembers: TaskMember[];

  @HasMany(() => TaskMessage, { foreignKey: 'taskId' })
  taskMessages: TaskMessage[];

  @HasMany(() => TaskSubtask, { foreignKey: 'taskId' })
  taskSubtasks: TaskSubtask[];
}
