import { ApiProperty } from '@nestjs/swagger';

export class UpdateChatMessageDto {
  @ApiProperty({ example: 1, description: 'ID сообщения' })
  readonly id: number;

  @ApiProperty({ example: 'Привет', description: 'Сообщение', required: false })
  readonly message: string;

  @ApiProperty({
    example: 'text',
    description: 'Тип сообщения',
    required: false,
  })
  readonly type: 'text' | 'image';

  @ApiProperty({
    example: 'false',
    description: 'Изменено или нет',
    required: false,
  })
  readonly edited: boolean;
}
