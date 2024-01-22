import { ApiProperty } from '@nestjs/swagger';

export class CreateProductsDto {
  @ApiProperty({
    example: ['d56d6da8-dce3-11e7-7a31-d0fd00178cbd'],
    description: 'ID товаров или услуг в МойСклад',
  })
  readonly moyskladIds: string[];
}
