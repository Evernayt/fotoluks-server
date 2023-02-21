import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({ example: 1, description: 'ID категории' })
  readonly id: number;

  @ApiProperty({ example: 'Фотоуслуги', description: 'Наименование' })
  readonly name: string;

  @ApiProperty({
    example: 'false',
    description: 'В архиве или нет',
    required: false,
  })
  readonly archive: boolean;
}
