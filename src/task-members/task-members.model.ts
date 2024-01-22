import { Task } from 'src/tasks/tasks.model';
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

interface TaskMemberCreationAttrs {
  employeeId: number;
  taskId: number;
}

@Table({ tableName: 'task_members' })
export class TaskMember extends Model<TaskMember, TaskMemberCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID участника задачи' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Task)
  @Column({ type: DataType.INTEGER })
  taskId: number;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER })
  employeeId: number;

  @BelongsTo(() => Task, { foreignKey: 'taskId' })
  task: Task;

  @BelongsTo(() => Employee, { foreignKey: 'employeeId' })
  employee: Employee;
}
