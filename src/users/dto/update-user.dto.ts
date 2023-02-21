import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 1, description: 'ID пользователя' })
  readonly id: number;

  @ApiProperty({ example: 'Иван', description: 'Имя', required: false })
  readonly name: string;

  @ApiProperty({
    example: '88005554545',
    description: 'Номер телефона',
    required: false,
  })
  readonly phone: string;

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

  @ApiProperty({
    example: 'https://google.com',
    description: 'Аватар',
    required: false,
  })
  readonly avatar: string;

  @ApiProperty({
    example: 'false',
    description: 'В архиве или нет',
    required: false,
  })
  readonly archive: boolean;
}
