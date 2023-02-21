import { ApiProperty } from '@nestjs/swagger';
import { IPosition } from 'src/moysklad/models/IPosition';

export class CreateMovePositionsDto {
  @ApiProperty({
    example: '7944ef04-f831-11e5-7a69-971500188b19',
    description: 'ID перемещения',
  })
  readonly id: string;

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
}
