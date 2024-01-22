import { ApiProperty } from '@nestjs/swagger';

export class DeleteFavoriteDto {
  @ApiProperty({ example: 1, description: 'ID избранного' })
  readonly favoriteId: number;

  @ApiProperty({ example: 1, description: 'ID продукта' })
  readonly productId: number;
}
