import { ApiProperty } from '@nestjs/swagger';

export class GetCounterpartyDto {
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
    example: '677c4032-8667-11e6-8a84-bae500003344',
    description: 'ID',
    required: false,
  })
  readonly id?: string;

  @ApiProperty({
    example: 'иван',
    description: 'Поиск',
    required: false,
  })
  readonly search?: string;
}
