import { ApiProperty } from '@nestjs/swagger';

export class GetReportsDto {
  @ApiProperty({ example: 25, description: 'Лимит', required: false })
  readonly limit: number;

  @ApiProperty({ example: 1, description: 'Страница', required: false })
  readonly page: number;

  @ApiProperty({
    example: 'текст',
    description: 'Текст поиска',
    required: false,
  })
  readonly search: string;
}
