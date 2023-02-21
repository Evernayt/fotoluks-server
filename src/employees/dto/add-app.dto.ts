import { ApiProperty } from '@nestjs/swagger';

export class AddAppDto {
  @ApiProperty({ example: [1, 2], description: 'ID приложений' })
  readonly appIds: number[];

  @ApiProperty({ example: 1, description: 'ID сотрудника' })
  readonly employeeId: number;
}
