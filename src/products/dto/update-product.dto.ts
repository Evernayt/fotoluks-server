import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ example: 1, description: 'ID продукта' })
  readonly id: number;

  @ApiProperty({
    example: 'Фотохолст',
    description: 'Наименование',
    required: false,
  })
  readonly name: string;

  @ApiProperty({
    example: 'Фотохолсты',
    description: 'Наименование во мн.ч.',
    required: false,
  })
  readonly pluralName: string;

  @ApiProperty({
    example: 'На подрамнике',
    description: 'Описание',
    required: false,
  })
  readonly description: string;

  @ApiProperty({
    example: 'https://google.com',
    description: 'Изображение',
    required: false,
  })
  readonly image: string;

  @ApiProperty({ example: 1, description: 'ID категории', required: false })
  readonly categoryId: number;

  @ApiProperty({
    example: 'false',
    description: 'В архиве или нет',
    required: false,
  })
  readonly archive: boolean;
}
