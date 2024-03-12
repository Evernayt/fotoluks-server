import { ApiProperty } from '@nestjs/swagger';

export class CreateChatMessageDto {
  @ApiProperty({ example: 'Привет', description: 'Сообщение' })
  readonly message: string;

  @ApiProperty({ example: 'text', description: 'Тип сообщения' })
  readonly type: 'text' | 'image';

  @ApiProperty({ example: 1, description: 'ID чата' })
  readonly chatId: number;

  @ApiProperty({ example: 1, description: 'ID сотрудника' })
  readonly employeeId: number;
}
