import { ApiProperty } from '@nestjs/swagger';

export class GetSuppliesDto {
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
    example:
      'https://online.moysklad.ru/api/remap/1.2/entity/product/3e3b6cad-4450-11eb-0a80-07c5000d9516',
    description: 'Ссылка на товар',
    required: false,
  })
  readonly productHref: string;

  @ApiProperty({
    example: 'КЗРК0074098',
    description: 'Поиск',
    required: false,
  })
  readonly search?: string;
}
