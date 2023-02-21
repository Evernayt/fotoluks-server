import { ApiProperty } from '@nestjs/swagger';

export class UpdateFeatureDto {
  @ApiProperty({ example: 1, description: 'ID характеристики' })
  readonly id: number;

  @ApiProperty({ example: 'Цвет', description: 'Наименование' })
  readonly name: string;

  @ApiProperty({ example: 'Цвета', description: 'Наименование во мн.ч.' })
  readonly pluralName: string;

  @ApiProperty({
    example: 'false',
    description: 'В архиве или нет',
    required: false,
  })
  readonly archive: boolean;
}
