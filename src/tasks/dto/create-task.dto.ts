import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Новая задача', description: 'Заголовок задачи' })
  readonly title: string;

  @ApiProperty({ example: 'Описание', description: 'Описание задачи' })
  readonly description: string;

  @ApiProperty({ example: 'false', description: 'Срочно или нет' })
  readonly urgent: boolean;

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
}
