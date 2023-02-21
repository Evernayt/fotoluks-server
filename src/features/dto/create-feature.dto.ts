import { ApiProperty } from '@nestjs/swagger';

export class CreateFeatureDto {
  @ApiProperty({ example: 'Цвет', description: 'Наименование' })
  readonly name: string;

  @ApiProperty({ example: 'Цвета', description: 'Наименование во мн.ч.' })
  readonly pluralName: string;
}
