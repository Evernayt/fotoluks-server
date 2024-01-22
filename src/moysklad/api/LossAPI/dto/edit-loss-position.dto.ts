import { ApiProperty } from '@nestjs/swagger';

export class EditLossPositionDto {
  @ApiProperty({
    example: '7944ef04-f831-11e5-7a69-971500188b19',
    description: 'ID списания',
  })
  readonly id: string;

  @ApiProperty({
    example: '7944ef04-f831-11e5-7a69-971500188b20',
    description: 'ID позиции',
  })
  readonly positionId: string;

  @ApiProperty({
    example: 172,
    description: 'Количество товаров',
  })
  readonly quantity: number;

  @ApiProperty({
    example: 7777,
    description: 'Цена',
    required: false,
  })
  readonly price: number;

  @ApiProperty({
    example: 'Разорван',
    description: 'Причина списания',
    required: false,
  })
  readonly reason: string;
}
