import { ApiProperty } from '@nestjs/swagger';

export class GetSupplyPositionsDto {
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
    example: '7944ef04-f831-11e5-7a69-971500188b19',
    description: 'ID приемки',
  })
  readonly id: string;
}
