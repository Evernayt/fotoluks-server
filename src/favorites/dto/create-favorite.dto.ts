import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty({ example: 1, description: 'ID сотрудника' })
  readonly employeeId: number;

  @ApiProperty({ example: 1, description: 'ID продукта' })
  readonly productId: number;
}
