import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ example: 1, description: 'ID продукта' })
  readonly id: number;

  @ApiProperty({
    example: 'Фотохолст',
    description: 'Наименование',
    required: false,
  })
  readonly name: string;

  @ApiProperty({
    example: 'd56d6da8-dce3-11e7-7a31-d0fd00178cbd',
    description: 'ID товара или услуги в МойСклад',
    required: false,
  })
  readonly moyskladId: string | null;

  @ApiProperty({ example: 150, description: 'Цена', required: false })
  readonly price: number;

  @ApiProperty({
    example: 'false',
    description: 'Запретить скидки',
    required: false,
  })
  readonly discountProhibited: boolean;

  @ApiProperty({
    example: '2022-09-04 16:45:00',
    description: 'Дата синхронизации с МойСклад',
    required: false,
  })
  moyskladSynchronizedAt: string | null;

  @ApiProperty({
    example: 'https://google.com',
    description: 'Изображение',
    required: false,
  })
  readonly image: string | null;

  @ApiProperty({
    example: 'false',
    description: 'В архиве или нет',
    required: false,
  })
  readonly archive: boolean;
}
