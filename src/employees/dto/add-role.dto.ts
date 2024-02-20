import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty({ example: [1, 2], description: 'ID ролей' })
  readonly roleIds: number[];

  @ApiProperty({ example: 1, description: 'ID сотрудника' })
  readonly employeeId: number;
}
