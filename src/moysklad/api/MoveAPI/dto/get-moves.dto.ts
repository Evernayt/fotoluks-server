import { ApiProperty } from '@nestjs/swagger';

export class GetMovesDto {
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

  @ApiProperty({
    example: '[FM] Луна -> Мич (Отдел: Фото)',
    description: 'Комментарий',
  })
  readonly description: string;

  @ApiProperty({
    example: '01506',
    description: 'Поиск',
    required: false,
  })
  readonly search?: string;
}
