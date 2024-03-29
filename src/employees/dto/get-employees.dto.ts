import { ApiProperty } from '@nestjs/swagger';

export class GetEmployeesDto {
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
    example: 'иван',
    description: 'Текст поиска',
    required: false,
  })
  readonly search: string;

  @ApiProperty({
    example: 1,
    description: 'ID приложения',
    required: false,
  })
  readonly appId: number;

  @ApiProperty({
    example: 1,
    description: 'ID ролей',
    required: false,
  })
  readonly roleIds: number[];
}
