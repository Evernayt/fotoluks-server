import { TaskMessage } from './../task-messages/task-messages.model';
import { TaskMember } from './../task-members/task-members.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { App } from 'src/apps/apps.model';
import { EmployeeApps } from 'src/apps/employee-apps.model';
import { Department } from 'src/departments/departments.model';
import { EmployeeDepartments } from 'src/departments/employee-departments.model';
import { Favorite } from 'src/favorites/favorites.model';
import { EmployeeNotifications } from 'src/notifications/employee-notifications.model';
import { Notification } from 'src/notifications/notifications.model';
import { OrderInfo } from 'src/order-infos/order-infos.model';
import { OrderMember } from 'src/order-members/order-members.model';
import { Task } from 'src/tasks/tasks.model';
import { Role } from 'src/roles/roles.model';

interface EmployeeCreationAttrs {
  login: string;
  password: string;
}

@Table({
  tableName: 'employees',
  indexes: [{ type: 'FULLTEXT', fields: ['name', 'surname', 'login'] }],
})
export class Employee extends Model<Employee, EmployeeCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID сотрудника' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Иван', description: 'Имя' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия' })
  @Column({ type: DataType.STRING, allowNull: false })
  surname: string;

  @ApiProperty({ example: 'ivan', description: 'Логин' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  login: string;

  @ApiProperty({ example: '12345', description: 'Пароль' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'https://google.com', description: 'Аватар' })
  @Column({ type: DataType.STRING, defaultValue: null })
  avatar: string;

  @ApiProperty({ example: 'false', description: 'В архиве или нет' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  archive: boolean;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;

  @BelongsToMany(() => App, () => EmployeeApps)
  apps: App[];

  @BelongsToMany(() => Department, () => EmployeeDepartments)
  departments: Department[];

  @BelongsToMany(() => Notification, () => EmployeeNotifications)
  notifications: Notification[];

  @HasMany(() => OrderInfo, { foreignKey: 'employeeId' })
  orderInfos: OrderInfo[];

  @HasMany(() => OrderMember, { foreignKey: 'employeeId' })
  orderMembers: OrderMember[];

  @HasMany(() => Favorite, { foreignKey: 'employeeId' })
  favorites: Favorite[];

  @HasMany(() => Task, { foreignKey: 'creatorId' })
  tasks: Task[];

  @HasMany(() => Task, { foreignKey: 'executorId' })
  tasks2: Task[];

  @HasMany(() => TaskMember, { foreignKey: 'employeeId' })
  taskMembers: TaskMember[];

  @HasMany(() => TaskMessage, { foreignKey: 'employeeId' })
  taskMessages: Task[];

  @BelongsTo(() => Role, { foreignKey: 'roleId' })
  role: Role;
}
