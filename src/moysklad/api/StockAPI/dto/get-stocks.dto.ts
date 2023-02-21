import { ApiProperty } from '@nestjs/swagger';

export class GetStocksDto {
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

  @ApiProperty({ example: 'product', description: 'Тип', required: false })
  readonly type: string;

  @ApiProperty({
    example:
      'https://online.moysklad.ru/api/remap/1.2/entity/product/3e3b6cad-4450-11eb-0a80-07c5000d9516',
    description: 'Ссылка на товар',
    required: false,
  })
  readonly productHref: string;
}
