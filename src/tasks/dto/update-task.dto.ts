import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({ example: 1, description: 'ID задачи' })
  readonly id: number;

  @ApiProperty({
    example: 'Новая задача',
    description: 'Заголовок задачи',
    required: false,
  })
  readonly title: string;

  @ApiProperty({
    example: 'Описание',
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
}
