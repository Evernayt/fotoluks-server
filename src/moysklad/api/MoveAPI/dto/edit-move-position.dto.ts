import { ApiProperty } from '@nestjs/swagger';

export class EditMovePositionDto {
  @ApiProperty({
    example: '7944ef04-f831-11e5-7a69-971500188b19',
    description: 'ID перемещения',
  })
  readonly id: string;

  @ApiProperty({
    example: '7944ef04-f831-11e5-7a69-971500188b20',
    description: 'ID позиции',
  })
  readonly positionID: string;

  @ApiProperty({
    example: 172,
    description: 'Количество товаров',
  })
  readonly quantity: number;
}
