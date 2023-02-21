import { ApiProperty } from '@nestjs/swagger';

export class UpdateVariantDto {
  @ApiProperty({
    example: '7944ef04-f831-11e5-7a69-971500188b19',
    description: 'ID модификации',
  })
  readonly id: string;

  @ApiProperty({
    example: '12345',
    description: 'Код товара',
    required: false,
  })
  readonly code: string;

  @ApiProperty({
    example: 'Товар выведен из ассортимента',
    description: 'Комментарий',
    required: false,
  })
  readonly description: string;
}
