import { ApiProperty } from '@nestjs/swagger';

export class GetLossesDto {
  @ApiProperty({
    example: 100,
    description: 'Максимальное количество сущностей для извлечения',
  })
  readonly limit: number;

  @ApiProperty({
    example: 0,
    description: 'Отступ в выдаваемом списке сущностей',
  })
  readonly offset: number;

  @ApiProperty({
    example: 'Декабрь для работы (Склад Луначарского 41)',
    description: 'Комментарий',
  })
  readonly description: string;

  @ApiProperty({ example: 2022, description: 'Год создания' })
  readonly year: number;
}
