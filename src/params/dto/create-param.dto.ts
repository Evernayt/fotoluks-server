import { ApiProperty } from '@nestjs/swagger';

export class CreateParamDto {
  @ApiProperty({ example: 'Бордовая', description: 'Наименование' })
  readonly name: string;

  @ApiProperty({ example: '#800000', description: 'Значение' })
  readonly value: string;

  @ApiProperty({ example: 1, description: 'ID характеристики' })
  readonly featureId: number;
}
