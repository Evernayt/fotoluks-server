import { ApiProperty } from '@nestjs/swagger';

export class AddDepartmentDto {
  @ApiProperty({ example: [1, 2], description: 'ID отдeла' })
  readonly departmentIds: number[];

  @ApiProperty({ example: 1, description: 'ID сотрудника' })
  readonly employeeId: number;
}
