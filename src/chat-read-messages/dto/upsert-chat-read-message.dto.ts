import { ApiProperty } from '@nestjs/swagger';

export class UpsertChatReadMessageDto {
  @ApiProperty({ example: 1, description: 'ID чата' })
  readonly chatId: number;

  @ApiProperty({ example: 1, description: 'ID сотрудника' })
  readonly employeeId: number;

  @ApiProperty({
    example: 1,
    description: 'ID последнего прочитанного сообщения',
  })
  readonly chatMessageId: number;
}
