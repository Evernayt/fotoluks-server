import { ApiProperty } from '@nestjs/swagger';

export class GetDepartmentsDto {
  @ApiProperty({ example: 25, description: 'Лимит', required: false })
  readonly limit: number;

  @ApiProperty({ example: 1, description: 'Страница', required: false })
  readonly page: number;

  @ApiProperty({
    example: 'false',
    description: 'Добавить в запрос Общий отдел',
    required: false,
  })
  readonly isIncludeGeneral: boolean;

  @ApiProperty({
    example: 'false',
    description: 'В архиве или нет',
    required: false,
  })
  readonly archive: boolean;
}
