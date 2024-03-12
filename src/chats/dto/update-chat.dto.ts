import { ApiProperty } from '@nestjs/swagger';

export class UpdateChatDto {
  @ApiProperty({ example: 1, description: 'ID чата' })
  readonly id: number;

  @ApiProperty({
    example: 'Чат 1',
    description: 'Название чата',
    required: false,
  })
  readonly name: string;

  @ApiProperty({
    example: 'https://google.com',
    description: 'Изображение',
    required: false,
  })
  readonly image: string;

  @ApiProperty({
    example: 1,
    description: 'ID участников (employeeId)',
    required: false,
  })
  readonly employeeIds: number[];
}
