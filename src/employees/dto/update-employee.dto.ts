import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmployeeDto {
  @ApiProperty({ example: 1, description: 'ID сотрудника' })
  readonly id: number;

  @ApiProperty({ example: 'Иван', description: 'Имя', required: false })
  readonly name: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия', required: false })
  readonly surname: string;

  @ApiProperty({ example: 'ivan', description: 'Логин', required: false })
  readonly login: string;

  @ApiProperty({ example: 'https://google.com', description: 'Аватар' })
  readonly avatar: string;

  @ApiProperty({
    example: 'false',
    description: 'В архиве или нет',
    required: false,
  })
  readonly archive: boolean;
}
