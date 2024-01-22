import { ApiProperty } from '@nestjs/swagger';
import { UpdateTaskSubtaskDto } from 'src/task-subtasks/dto/update-task-subtask.dto';
import { TaskSubtask } from 'src/task-subtasks/task-subtasks.model';

export class UpdateTaskDto {
  @ApiProperty({ example: 1, description: 'ID задачи' })
  readonly id: number;

  @ApiProperty({
    example: 'Что не так',
    description: 'Заголовок задачи',
    required: false,
  })
  readonly title: string;

  @ApiProperty({
    example: 'Что сделать',
    description: 'Описание задачи',
    required: false,
  })
  readonly description: string;

  @ApiProperty({
    example: 'false',
    description: 'Срочно или нет',
    required: false,
  })
  readonly urgent: boolean;

  @ApiProperty({
    example: 'false',
    description: 'Личное или нет',
    required: false,
  })
  readonly personal: boolean;

  @ApiProperty({
    example: 'false',
    description: 'Завершено или нет',
    required: false,
  })
  readonly completed: boolean;

  @ApiProperty({
    example: '2022-09-04 16:45:00',
    description: 'Дата завершения',
    required: false,
  })
  readonly completedDate: string | null;

  @ApiProperty({
    example: 'Примечание',
    description: 'Примечание завершения',
    required: false,
  })
  readonly completionNote: string;

  @ApiProperty({
    example: 'false',
    description: 'В архиве или нет',
    required: false,
  })
  readonly archive: boolean;

  @ApiProperty({ example: 1, description: 'ID филиала', required: false })
  readonly shopId: number;

  @ApiProperty({ example: 1, description: 'ID отдела', required: false })
  readonly departmentId: number;

  @ApiProperty({
    example: 1,
    description: 'ID завершившего сотрудника',
    required: false,
  })
  readonly executorId: number | null;

  @ApiProperty({
    example: 1,
    description: 'ID исполнителей (employeeId) для создания',
    required: false,
  })
  readonly taskMembersForCreate: number[];

  @ApiProperty({
    example: 1,
    description: 'ID исполнителей (employeeId) для удаления',
    required: false,
  })
  readonly taskMembersForDelete: number[];

  @ApiProperty({
    example: 1,
    description: 'Текст подзадач для создания',
    required: false,
  })
  readonly taskSubtasksForCreate: TaskSubtask[];

  @ApiProperty({
    example: 1,
    description: 'Подзадачи для обновления',
    required: false,
  })
  readonly taskSubtasksForUpdate: UpdateTaskSubtaskDto[];

  @ApiProperty({
    example: 1,
    description: 'ID подзадач для удаления',
    required: false,
  })
  readonly taskSubtasksForDelete: number[];
}
