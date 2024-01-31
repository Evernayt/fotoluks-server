import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty({ example: '', description: 'Описание' })
  readonly description: string;

  @ApiProperty({ example: 1, description: 'ID создавшего сотрудника' })
  readonly employeeId: number;
}
