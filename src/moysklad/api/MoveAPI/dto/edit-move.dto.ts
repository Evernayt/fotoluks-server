import { ApiProperty } from '@nestjs/swagger';
import { IStore } from 'src/moysklad/models/IStore';

export class EditMoveDto {
  @ApiProperty({
    example: '7944ef04-f831-11e5-7a69-971500188b19',
    description: 'ID перемещения',
  })
  readonly id: string;

  @ApiProperty({
    example: {
      meta: {
        href: 'https://online.moysklad.ru/api/remap/1.2/entity/store/faf3ff5b-2e58-11e6-8a84-bae500000050',
        metadataHref:
          'https://online.moysklad.ru/api/remap/1.2/entity/store/metadata',
        type: 'store',
        mediaType: 'application/json',
      },
    },
    description: 'Ссылка на склад, с которого совершается перемещение',
  })
  readonly sourceStore: IStore;

  @ApiProperty({
    example: {
      meta: {
        href: 'https://online.moysklad.ru/api/remap/1.2/entity/store/faf3ff5b-2e58-11e6-8a84-bae500000050',
        metadataHref:
          'https://online.moysklad.ru/api/remap/1.2/entity/store/metadata',
        type: 'store',
        mediaType: 'application/json',
      },
    },
    description: 'Ссылка на склад, на который совершается перемещение',
  })
  readonly targetStore: IStore;

  @ApiProperty({
    example: '[FM] Луна -> Мич (Фото-отдел)',
    description: 'Комментарий',
  })
  readonly description: string;
}
