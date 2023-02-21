import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({ example: 'Изменен статус', description: 'Заголовок' })
  readonly title: string;

  @ApiProperty({
    example: 'Иван изменил статус заказа № 137 c «Новый» на «В работе»',
    description: 'Текст уведомления',
  })
  readonly text: string;

  @ApiProperty({ example: [1, 2], description: 'ID сотрудников' })
  readonly employeeIds: number[];
}
