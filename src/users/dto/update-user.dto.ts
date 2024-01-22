import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 1, description: 'ID пользователя' })
  readonly id: number;

  @ApiProperty({ example: 'Иван', description: 'Имя', required: false })
  readonly name: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия', required: false })
  readonly surname: string;

  @ApiProperty({
    example: 'Иванович',
    description: 'Отчество',
    required: false,
  })
  readonly patronymic: string;

  @ApiProperty({
    example: '88005554545',
    description: 'Номер телефона',
    required: false,
  })
  readonly phone: string;

  @ApiProperty({ example: 10, description: 'Процент скидки', required: false })
  readonly discount: number;

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
    example: 'd56d6da8-dce3-11e7-7a31-d0fd00178cbd',
    description: 'ID контрагента в МойСклад',
    required: false,
  })
  readonly moyskladId: string | null;

  @ApiProperty({
    example: '2022-09-04 16:45:00',
    description: 'Дата синхронизации с МойСклад',
    required: false,
  })
  moyskladSynchronizedAt: string | null;

  @ApiProperty({
    example: 'false',
    description: 'В архиве или нет',
    required: false,
  })
  readonly archive: boolean;
}
