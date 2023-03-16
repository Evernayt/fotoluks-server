import { TaskMember } from './../task-members/task-members.model';
import { TaskMessage } from './../task-messages/task-messages.model';
import { Shop } from 'src/shops/shops.model';
import { Department } from 'src/departments/departments.model';
import { Employee } from 'src/employees/employees.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface TaskCreationAttrs {
  title: string;
  description: string;
  urgent: boolean;
  creatorId: number;
  completedDate: null;
}

@Table({ tableName: 'tasks' })
export class Task extends Model<Task, TaskCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID задачи' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Новая задача', description: 'Заголовок задачи' })
  @Column({ type: DataType.TEXT, allowNull: false })
  title: string;

  @ApiProperty({ example: 'Описание', description: 'Описание задачи' })
  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @ApiProperty({ example: 'false', description: 'Срочно или нет' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  urgent: boolean;

  @ApiProperty({ example: 'false', description: 'Завершено или нет' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  completed: boolean;

  @ApiProperty({
    example: '2022-09-04 16:45:00',
    description: 'Дата завершения',
  })
  @Column({ type: DataType.DATE })
  completedDate: string;

  @ApiProperty({ example: 'false', description: 'В архиве или нет' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  archive: boolean;

  @BelongsTo(() => Shop, { foreignKey: 'shopId' })
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
}
