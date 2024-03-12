import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty({ example: 'Чат 1', description: 'Название чата' })
  readonly name: string;

  @ApiProperty({ example: 'https://google.com', description: 'Изображение' })
  readonly image: string;

  @ApiProperty({ example: 1, description: 'ID создавшего сотрудника' })
  readonly creatorId: number;

  @ApiProperty({ example: 1, description: 'ID участников (employeeId)' })
  readonly employeeIds: number[];
}
