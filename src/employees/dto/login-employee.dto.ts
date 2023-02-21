import { ApiProperty } from '@nestjs/swagger';

export class LoginEmployeeDto {
  @ApiProperty({ example: 'ivan', description: 'Логин' })
  readonly login: string;

  @ApiProperty({ example: '12345', description: 'Пароль' })
  readonly password: string;
}
