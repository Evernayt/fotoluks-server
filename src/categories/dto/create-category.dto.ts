import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Фотоуслуги', description: 'Наименование' })
  readonly name: string;
}
