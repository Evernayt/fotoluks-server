import { ApiProperty } from '@nestjs/swagger';

export class GetFavoritesDto {
  @ApiProperty({ example: 25, description: 'Лимит', required: false })
  readonly limit: number;

  @ApiProperty({ example: 1, description: 'Страница', required: false })
  readonly page: number;

  @ApiProperty({
    example: 1,
    description: 'ID сотрудника',
    required: false,
  })
  readonly employeeId: number;
}
