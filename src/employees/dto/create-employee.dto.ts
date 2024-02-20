import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'Иван', description: 'Имя' })
  readonly name: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия' })
  readonly surname: string;

  @ApiProperty({ example: 'ivan', description: 'Логин' })
  readonly login: string;

  @ApiProperty({ example: '12345', description: 'Пароль' })
  readonly password: string;
}
