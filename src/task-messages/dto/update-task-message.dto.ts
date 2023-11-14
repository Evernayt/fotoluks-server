import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskMessageDto {
  @ApiProperty({ example: 1, description: 'ID сообщения' })
  readonly id: number;

  @ApiProperty({ example: 'Привет', description: 'Сообщение' })
  readonly message: string;
}
