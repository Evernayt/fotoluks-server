import { ApiProperty } from '@nestjs/swagger';

export class GetSupplyPositionsDto {
  @ApiProperty({
    example: 100,
    description: 'Максимальное количество сущностей для извлечения',
    required: false,
  })
  readonly limit: number;

  @ApiProperty({
    example: 0,
    description: 'Отступ в выдаваемом списке сущностей',
    required: false,
  })
  readonly offset: number;

  @ApiProperty({
    example: '7944ef04-f831-11e5-7a69-971500188b19',
    description: 'ID приемки',
  })
  readonly id: string;

  @ApiProperty({
    example: 'agent,product',
    description: 'Получить связанные объекты',
    required: false,
  })
  readonly expand?: string;

  @ApiProperty({
    example: 'stock',
    description: 'Дополнительные поля',
    required: false,
  })
  readonly fields: string;
}
