import { ApiProperty } from '@nestjs/swagger';

export class GetNotificationsDto {
  @ApiProperty({
    example: 100,
    description: 'Максимальное количество сущностей для извлечения',
  })
  readonly limit: number;

  @ApiProperty({
    example: 0,
    description: 'Отступ в выдаваемом списке сущностей',
  })
  readonly offset: number;
}
