import { ApiProperty } from '@nestjs/swagger';

export class EditOrderStatusDto {
  @ApiProperty({ example: 'Закончилась фотобумага', description: 'Описание' })
  readonly description: string;

  @ApiProperty({ example: 1, description: 'ID заказа' })
  readonly orderId: number;

  @ApiProperty({ example: 1, description: 'ID статуса' })
  readonly statusId: number;

  @ApiProperty({ example: 1, description: 'ID сотрудника' })
  readonly employeeId: number;
}
