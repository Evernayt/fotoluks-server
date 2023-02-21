import { ApiProperty } from '@nestjs/swagger';

export class GetOrderInfosDto {
  @ApiProperty({ example: 25, description: 'Лимит', required: false })
  readonly limit: number;

  @ApiProperty({ example: 1, description: 'Страница', required: false })
  readonly page: number;

  @ApiProperty({
    example: 1,
    description: 'ID заказа',
    required: false,
  })
  readonly orderId: number;
}
