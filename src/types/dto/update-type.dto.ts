import { ApiProperty } from '@nestjs/swagger';

export class UpdateTypeDto {
  @ApiProperty({ example: 1, description: 'ID типа' })
  readonly id: number;

  @ApiProperty({
    example: '10х15',
    description: 'Наименование',
    required: false,
  })
  readonly name: string;

  @ApiProperty({ example: 10, description: 'Цена', required: false })
  readonly price: number;

  @ApiProperty({
    example: 'https://google.com',
    description: 'Изображение',
    required: false,
  })
  readonly image: string;

  @ApiProperty({ example: 1, description: 'ID продукта', required: false })
  readonly productId: number;

  @ApiProperty({
    example: [1, 2],
    description: 'ID характеристик',
    required: false,
  })
  readonly featureIds: number[];

  @ApiProperty({
    example: 'false',
    description: 'В архиве или нет',
    required: false,
  })
  readonly archive: boolean;
}
