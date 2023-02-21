import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({
    example: '7944ef04-f831-11e5-7a69-971500188b19',
    description: 'ID товара',
  })
  readonly id: string;

  @ApiProperty({
    example: '12345',
    description: 'Артикул товара',
    required: false,
  })
  readonly article: string;

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

  @ApiProperty({
    example: 1,
    description: 'Неснижаемый остаток',
    required: false,
  })
  readonly minimumBalance: string;
}
