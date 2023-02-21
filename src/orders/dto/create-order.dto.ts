import { ApiProperty } from '@nestjs/swagger';
import { ICreatedFinishedProduct } from '../models/ICreatedFinishedProduct';
import { ICreatedOrderMember } from '../models/ICreatedOrderMember';
import { IOrderBody } from '../models/IOrderBody';
import { IOrderInfoBody } from '../models/IOrderInfoBody';

export class CreateOrderDto {
  @ApiProperty({ description: 'Данные заказа' })
  readonly orderBody: IOrderBody;

  @ApiProperty({ description: 'Данные информации заказа' })
  readonly orderInfoBody: IOrderInfoBody;

  @ApiProperty({ description: 'Данные завершенных продуктов для создания' })
  readonly finishedProductsForCreateBody: ICreatedFinishedProduct[];

  @ApiProperty({ description: 'Данные завершенных продуктов для обновления' })
  readonly finishedProductsForUpdateBody: ICreatedFinishedProduct[];

  @ApiProperty({ description: 'Данные ID завершенных продуктов для удаления' })
  readonly finishedProductsForDeleteBody: number[];

  @ApiProperty({ description: 'Данные участинков заказа для создания' })
  readonly orderMembersForCreateBody: ICreatedOrderMember[];

  @ApiProperty({ description: 'Данные ID участинков заказа для удаления' })
  readonly orderMembersForDeleteBody: number[];
}
