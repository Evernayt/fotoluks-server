import { ApiProperty } from '@nestjs/swagger';
import { TaskSubtask } from 'src/task-subtasks/task-subtasks.model';

export class CreateTaskDto {
  @ApiProperty({ example: 'Что не так', description: 'Заголовок задачи' })
  readonly title: string;

  @ApiProperty({ example: 'Что сделать', description: 'Описание задачи' })
  readonly description: string;

  @ApiProperty({ example: 'false', description: 'Срочно или нет' })
  readonly urgent: boolean;

  @ApiProperty({ example: 'false', description: 'Личное или нет' })
  readonly personal: boolean;

  @ApiProperty({ example: 1, description: 'ID филиала' })
  readonly shopId: number;

  @ApiProperty({ example: 1, description: 'ID отдела' })
  readonly departmentId: number;

  @ApiProperty({ example: 1, description: 'ID создавшего сотрудника' })
  readonly creatorId: number;

  @ApiProperty({
    example: 1,
    description: 'ID исполнителей (employeeId)',
    required: false,
  })
  readonly taskMembersForCreate: number[];

  @ApiProperty({
    example: 1,
    description: 'Текст подзадач (text)',
    required: false,
  })
  readonly taskSubtasksForCreate: TaskSubtask[];
}
