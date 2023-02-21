import { ApiProperty } from '@nestjs/swagger';

export class UpdateParamDto {
  @ApiProperty({ example: 1, description: 'ID параметра' })
  readonly id: number;

  @ApiProperty({ example: 'Бордовая', description: 'Наименование' })
  readonly name: string;

  @ApiProperty({ example: '#800000', description: 'Значение' })
  readonly value: string;

  @ApiProperty({ example: 1, description: 'ID характеристики' })
  readonly featureId: number;

  @ApiProperty({
    example: 'false',
    description: 'В архиве или нет',
    required: false,
  })
  readonly archive: boolean;
}
