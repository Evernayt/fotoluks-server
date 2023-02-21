import { ApiProperty } from '@nestjs/swagger';

export class UpdateShopDto {
  @ApiProperty({ example: 1, description: 'ID филиала' })
  readonly id: number;

  @ApiProperty({ example: 'Луначарского', description: 'Наименование' })
  readonly name: string;

  @ApiProperty({ example: 'Напротив «Школа №4»', description: 'Описание' })
  readonly description: string;

  @ApiProperty({
    example: 'Туймзаы, ул. Луначарского 41',
    description: 'Адрес',
  })
  readonly address: string;

  @ApiProperty({
    example: 'Луна',
    description: 'Аббревиатура',
  })
  readonly abbreviation: string;

  @ApiProperty({
    example: 'false',
    description: 'В архиве или нет',
    required: false,
  })
  readonly archive: boolean;
}
