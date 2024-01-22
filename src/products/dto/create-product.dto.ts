import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'Фотохолст',
    description: 'Наименование',
  })
  readonly name: string;

  @ApiProperty({
    example: 'd56d6da8-dce3-11e7-7a31-d0fd00178cbd',
    description: 'ID товара или услуги в МойСклад',
  })
  readonly moyskladId: string | null;

  @ApiProperty({ example: 150, description: 'Цена' })
  readonly price: number;

  @ApiProperty({
    example: 'false',
    description: 'Запретить скидки',
  })
  readonly discountProhibited: boolean;

  @ApiProperty({
    example: '2022-09-04 16:45:00',
    description: 'Дата синхронизации с МойСклад',
  })
  moyskladSynchronizedAt: string | null;

  @ApiProperty({
    example: 'https://google.com',
    description: 'Изображение',
    required: false,
  })
  readonly image: string | null;
}
