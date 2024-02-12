import { ApiProperty } from '@nestjs/swagger';
import { ICreatedOrderMember } from '../models/ICreatedOrderMember';
import { IOrderBody } from '../models/IOrderBody';
import { IOrderInfoBody } from '../models/IOrderInfoBody';
import { ICreatedOrderProduct } from '../models/ICreatedOrderProduct';

export class CreateOrderDto {
  @ApiProperty({ description: 'Данные заказа' })
  readonly orderBody: IOrderBody;

  @ApiProperty({ description: 'Информация заказа' })
  readonly orderInfoBody: IOrderInfoBody;

  @ApiProperty({ description: 'Продукты заказа для создания' })
  readonly orderProductsForCreateBody: ICreatedOrderProduct[];

  @ApiProperty({ description: 'Продукты заказа для обновления' })
  readonly orderProductsForUpdateBody: ICreatedOrderProduct[];

  @ApiProperty({ description: 'ID продуктов заказа для удаления' })
  readonly orderProductsForDeleteBody: number[];

  @ApiProperty({ description: 'Участники заказа для создания' })
  readonly orderMembersForCreateBody: ICreatedOrderMember[];

  @ApiProperty({ description: 'ID участников заказа для удаления' })
  readonly orderMembersForDeleteBody: number[];

  @ApiProperty({ description: 'ID файлов заказа для удаления' })
  readonly orderFilesForDeleteBody: number[];
}
