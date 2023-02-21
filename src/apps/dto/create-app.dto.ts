import { ApiProperty } from '@nestjs/swagger';

export class CreateAppDto {
  @ApiProperty({ example: 'ORDERS', description: 'Приложение' })
  readonly value: string;

  @ApiProperty({ example: 'Заказы', description: 'Описание приложения' })
  readonly description: string;
}
