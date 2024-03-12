import { ApiProperty } from '@nestjs/swagger';

export class LeaveChatDto {
  @ApiProperty({ example: 1, description: 'ID чата' })
  readonly id: number;

  @ApiProperty({ example: 1, description: 'ID участника' })
  readonly employeeId: number;

  @ApiProperty({ example: 1, description: 'ID создавшего сотрудника' })
  readonly creatorId: number;
}
