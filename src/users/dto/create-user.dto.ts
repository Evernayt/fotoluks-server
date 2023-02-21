import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: '88005554545', description: 'Номер телефона' })
  readonly phone: string;

  @ApiProperty({ example: '12345', description: 'Пароль' })
  readonly password: string;

  @ApiProperty({ example: 'Иван', description: 'Имя', required: false })
  readonly name: string;

  @ApiProperty({
    example: 'ivan@mail.ru',
    description: 'Почтовый адрес',
    required: false,
  })
  readonly email: string;

  @ApiProperty({ example: 'ivan', description: 'ВКонтакте', required: false })
  readonly vk: string;

  @ApiProperty({ example: 'ivan', description: 'Telegram', required: false })
  readonly telegram: string;
}
