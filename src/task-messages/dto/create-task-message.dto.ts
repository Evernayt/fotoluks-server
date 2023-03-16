import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskMessageDto {
  @ApiProperty({ example: 'Привет', description: 'Сообщение' })
  readonly message: string;

  @ApiProperty({ example: 1, description: 'ID задачи' })
  readonly taskId: number;

  @ApiProperty({ example: 1, description: 'ID сотрудника' })
  readonly employeeId: number;
}
