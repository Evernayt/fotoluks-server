import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderFileDto {
  @ApiProperty({ example: 'https://google.com', description: 'Ссылка' })
  readonly link: string;

  @ApiProperty({ example: 'Файл.jpg', description: 'Название файла' })
  readonly name: string;

  @ApiProperty({ example: 1024, description: 'Размер файла' })
  readonly size: number;

  @ApiProperty({ example: 1, description: 'ID заказа' })
  readonly orderId: number;

  @ApiProperty({ example: 1, description: 'ID услуги заказа' })
  readonly orderProductId: number;
}
