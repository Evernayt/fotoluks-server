import { ApiProperty } from '@nestjs/swagger';

export class UpdateReportDto {
  @ApiProperty({ example: 1, description: 'ID отзыва' })
  readonly id: number;

  @ApiProperty({ example: '', description: 'Описание', required: false })
  readonly description: string;

  @ApiProperty({
    example: 'false',
    description: 'Выполнено или нет',
    required: false,
  })
  readonly completed: boolean;
}
