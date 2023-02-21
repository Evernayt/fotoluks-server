import { ApiProperty } from '@nestjs/swagger';

export class CreateTypeDto {
  @ApiProperty({ example: '10х15', description: 'Наименование' })
  readonly name: string;

  @ApiProperty({ example: 10, description: 'Цена' })
  readonly price: number;

  @ApiProperty({ example: 'https://google.com', description: 'Изображение' })
  readonly image: string;

  @ApiProperty({ example: 1, description: 'ID продукта' })
  readonly productId: number;

  @ApiProperty({ example: [1, 2], description: 'ID характеристик', required: false })
  readonly featureIds: number[];
}
