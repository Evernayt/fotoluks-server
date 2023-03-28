import { ApiProperty } from '@nestjs/swagger';
import { ISalePrice } from 'src/moysklad/models/ISalePrice';

export class UpdateProductDto {
  @ApiProperty({
    example: '7944ef04-f831-11e5-7a69-971500188b19',
    description: 'ID товара',
  })
  readonly id: string;

  @ApiProperty({
    example: '12345',
    description: 'Артикул товара',
    required: false,
  })
  readonly article: string;

  @ApiProperty({
    example: '12345',
    description: 'Код товара',
    required: false,
  })
  readonly code: string;

  @ApiProperty({
    example: 'Товар выведен из ассортимента',
    description: 'Комментарий',
    required: false,
  })
  readonly description: string;

  @ApiProperty({
    example: 1,
    description: 'Неснижаемый остаток',
    required: false,
  })
  readonly minimumBalance: string;

  @ApiProperty({
    example: [
      {
        value: 3753.0,
        currency: {
          meta: {
            href: 'https://online.moysklad.ru/api/remap/1.2/entity/currency/6314188d-2c7f-11e6-8a84-bae500000055',
            metadataHref:
              'https://online.moysklad.ru/api/remap/1.2/entity/currency/metadata',
            type: 'currency',
            mediaType: 'application/json',
          },
        },
        priceType: {
          meta: {
            href: 'https://online.moysklad.ru/api/remap/1.2/context/companysettings/pricetype/672559f1-cbf3-11e1-9eb9-889ffa6f49fd',
            type: 'pricetype',
            mediaType: 'application/json',
          },
        },
      },
      {
        value: 3653,
        currency: {
          meta: {
            href: 'https://online.moysklad.ru/api/remap/1.2/entity/currency/6314188d-2c7f-11e6-8a84-bae500000055',
            metadataHref:
              'https://online.moysklad.ru/api/remap/1.2/entity/currency/metadata',
            type: 'currency',
            mediaType: 'application/json',
          },
        },
        priceType: {
          meta: {
            href: 'https://online.moysklad.ru/api/remap/1.2/context/companysettings/pricetype/672559f1-cbf3-11e1-9eb9-889ffa6f2222',
            type: 'pricetype',
            mediaType: 'application/json',
          },
        },
      },
    ],
    description: 'Продажная цена',
    required: false,
  })
  readonly salePrices: ISalePrice[];
}
