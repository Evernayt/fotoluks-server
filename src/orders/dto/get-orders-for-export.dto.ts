import { ApiProperty } from '@nestjs/swagger';

export class GetOrdersForExportDto {
  @ApiProperty({ example: 1, description: 'ID филиала' })
  readonly shopId: number;

  @ApiProperty({
    example: '2022-09-04 16:45:00',
    description: 'Дата начала',
  })
  readonly startDate: string;

  @ApiProperty({
    example: '2022-09-04 16:45:00',
    description: 'Дата окончания',
  })
  readonly endDate: string;
}
