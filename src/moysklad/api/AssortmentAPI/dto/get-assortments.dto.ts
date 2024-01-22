import { ApiProperty } from '@nestjs/swagger';

export class GetAssortmentsDto {
  @ApiProperty({
    example: 100,
    description: 'Максимальное количество сущностей для извлечения',
    required: false,
  })
  readonly limit?: number;

  @ApiProperty({
    example: 0,
    description: 'Отступ в выдаваемом списке сущностей',
    required: false,
  })
  readonly offset?: number;

  @ApiProperty({
    example: '[677c4032-8667-11e6-8a84-bae500003344]',
    description: 'IDs',
    required: false,
  })
  readonly ids?: string[];

  @ApiProperty({
    example: 'ручка',
    description: 'Поиск',
    required: false,
  })
  readonly search?: string;

  @ApiProperty({
    example:
      'https://online.moysklad.ru/api/remap/1.2/entity/store/656c4032-8667-11e6-8a84-bae500003321',
    description: 'Параметр для фильтрации по нескольким складам',
    required: false,
  })
  readonly stockStore?: string;

  @ApiProperty({
    example: 'false',
    description: 'В архиве или нет',
    required: false,
  })
  readonly archived?: boolean;
}
