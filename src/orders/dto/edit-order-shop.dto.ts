import { ApiProperty } from '@nestjs/swagger';

export class EditOrderShopDto {
  @ApiProperty({ example: 1, description: 'ID заказа' })
  readonly orderId: number;

  @ApiProperty({ example: 1, description: 'ID филиала' })
  readonly shopId: number;
}
