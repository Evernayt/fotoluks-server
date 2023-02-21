import { ApiProperty } from '@nestjs/swagger';

export class GetOrdersDto {
  @ApiProperty({ example: 25, description: 'Лимит', required: false })
  readonly limit: number;

  @ApiProperty({ example: 1, description: 'Страница', required: false })
  readonly page: number;

  @ApiProperty({ example: 1, description: 'ID статуса', required: false })
  readonly statusId: number;

  @ApiProperty({ example: [1, 2], description: 'ID филиалов', required: false })
  readonly shopIds: number[];

  @ApiProperty({
    example: '2022-09-04 16:45:00',
    description: 'Дата начала',
    required: false,
  })
  readonly startDate: string;

  @ApiProperty({
    example: '2022-09-04 16:45:00',
    description: 'Дата окончания',
    required: false,
  })
  readonly endDate: string;

  @ApiProperty({ example: 1, description: 'ID сотрудника', required: false })
  readonly employeeId: number;

  @ApiProperty({
    example: 'кружка',
    description: 'Текст поиска',
    required: false,
  })
  readonly search: string;
}
