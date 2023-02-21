import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmployeePasswordDto {
  @ApiProperty({ example: 1, description: 'ID сотрудника' })
  readonly id: number;

  @ApiProperty({
    example: '12345',
    description: 'Старый пароль',
  })
  readonly oldPassword: string;

  @ApiProperty({
    example: '12345',
    description: 'Новый пароль',
  })
  readonly newPassword: string;
}
