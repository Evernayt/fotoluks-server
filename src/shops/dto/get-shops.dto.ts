import { ApiProperty } from '@nestjs/swagger';

export class GetShopsDto {
  @ApiProperty({ example: 25, description: 'Лимит', required: false })
  readonly limit: number;

  @ApiProperty({ example: 1, description: 'Страница', required: false })
  readonly page: number;

  @ApiProperty({
    example: 'false',
    description: 'В архиве или нет',
    required: false,
  })
  readonly archive: boolean;

  @ApiProperty({
    example: 'false',
    description: 'Добавить в запрос Общий филиал',
    required: false,
  })
  readonly isIncludeGeneral: boolean;

  @ApiProperty({
    example: 'кружка',
    description: 'Текст поиска',
    required: false,
  })
  readonly search: string;
}
