import { ApiProperty } from '@nestjs/swagger';
import { IPosition } from 'src/moysklad/models/IPosition';
import { IStore } from 'src/moysklad/models/IStore';

export class CreateLossDto {
  @ApiProperty({
    example: {
      meta: {
        href: 'https://online.moysklad.ru/api/remap/1.2/entity/store/b72f4f02-9b8b-11e6-8af5-581e0000009b',
        metadataHref:
          'https://online.moysklad.ru/api/remap/1.2/entity/store/metadata',
        type: 'store',
        mediaType: 'application/json',
      },
    },
    description: 'Склад',
  })
  readonly store: IStore;

  @ApiProperty({
    example: [
      {
        quantity: 23,
        assortment: {
          meta: {
            href: 'https://online.moysklad.ru/api/remap/1.2/entity/product/987148b8-9a09-11e6-8af5-581e0000006f',
            metadataHref:
              'https://online.moysklad.ru/api/remap/1.2/entity/product/metadata',
            type: 'product',
            mediaType: 'application/json',
          },
        },
      },
      {
        quantity: 12,
        assortment: {
          meta: {
            href: 'https://online.moysklad.ru/api/remap/1.2/entity/variant/987d77f1-9a09-11e6-8af5-581e00000074',
            metadataHref:
              'https://online.moysklad.ru/api/remap/1.2/entity/variant/metadata',
            type: 'variant',
            mediaType: 'application/json',
          },
        },
      },
    ],
    description: 'Позиции',
  })
  readonly positions: IPosition[];

  @ApiProperty({
    example: '2022-12-31',
    description: 'Дата',
  })
  readonly updated: string;

  @ApiProperty({
    example: 'Декабрь для работы (Склад Луначарского 41)',
    description: 'Комментарий',
  })
  readonly description: string;
}
