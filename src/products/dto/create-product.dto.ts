import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Фотохолст', description: 'Наименование' })
  readonly name: string;

  @ApiProperty({ example: 'Фотохолсты', description: 'Наименование во мн.ч.' })
  readonly pluralName: string;

  @ApiProperty({ example: 'На подрамнике', description: 'Описание' })
  readonly description: string;

  @ApiProperty({ example: 'https://google.com', description: 'Изображение' })
  readonly image: string;

  @ApiProperty({ example: 1, description: 'ID категории' })
  readonly categoryId: number;
}
