import { ApiProperty } from '@nestjs/swagger';

export class GetTasksDto {
  @ApiProperty({ example: 25, description: 'Лимит', required: false })
  readonly limit: number;

  @ApiProperty({ example: 1, description: 'Страница', required: false })
  readonly page: number;

  @ApiProperty({
    example: 'false',
    description: 'В архиве или нет',
    required: false,
  })
  readonly archive: boolean;

  @ApiProperty({
    example: 'false',
    description: '0 - Все задачи, 1 - Незавершенные, 3 - Завершенные',
    required: false,
  })
  readonly status: number;

  @ApiProperty({ example: 1, description: 'ID сотрудника', required: false })
  readonly employeeId: number;

  @ApiProperty({ example: 1, description: 'ID создателя', required: false })
  readonly creatorId: number;

  @ApiProperty({ example: [1, 2], description: 'ID филиалов', required: false })
  readonly shopIds: number[];

  @ApiProperty({ example: [1, 2], description: 'ID отделов', required: false })
  readonly departmentIds: number[];

  @ApiProperty({
    example: 'кружка',
    description: 'Текст поиска',
    required: false,
  })
  readonly search: string;
}
