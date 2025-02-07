import { ApiProperty } from '@nestjs/swagger';
import { IAttribute } from 'src/moysklad/models/IAttribute';
import { ICounterparty } from 'src/moysklad/models/ICounterparty';
import { IStore } from 'src/moysklad/models/IStore';

export class CreateSupplyDto {
  @ApiProperty({
    example: {
      meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/counterparty/147c1f1b-32ca-11e6-8a84-bae500000004',
        metadataHref:
          'https://api.moysklad.ru/api/remap/1.2/entity/counterparty/metadata',
        type: 'counterparty',
        mediaType: 'application/json',
      },
    },
    description: 'Контрагент',
  })
  readonly agent: ICounterparty;

  @ApiProperty({
    example: {
      meta: {
        href: 'https://api.moysklad.ru/api/remap/1.2/entity/store/faf3ff5b-2e58-11e6-8a84-bae500000050',
        metadataHref:
          'https://api.moysklad.ru/api/remap/1.2/entity/store/metadata',
        type: 'store',
        mediaType: 'application/json',
      },
    },
    description: 'Склад',
  })
  readonly store: IStore;

  @ApiProperty({ example: '12412412', description: 'Входящий номер' })
  readonly incomingNumber: string;

  @ApiProperty({ example: '2012-12-12 12:12:12', description: 'Входящая дата' })
  readonly incomingDate: string;

  @ApiProperty({ example: 'Приемка от 12.12.12', description: 'Комментарий' })
  readonly description: string;

  @ApiProperty({
    example: [
      {
        meta: {
          href: 'https://api.moysklad.ru/api/remap/1.2/entity/supply/metadata/attributes/2aeeab9c-d926-11e9-0a80-01d100111352',
          type: 'attributemetadata',
          mediaType: 'application/json',
        },
        id: '2aeeab9c-d926-11e9-0a80-01d100111352',
        name: 'Оприходовано',
        type: 'boolean',
        value: false,
      },
    ],
    description: 'Атрибуты',
  })
  readonly attributes: IAttribute[];
}
