import { ApiProperty } from '@nestjs/swagger';

export class CreateShopDto {
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
}
