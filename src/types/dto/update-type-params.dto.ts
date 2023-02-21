import { ApiProperty } from '@nestjs/swagger';

export class UpdateTypeParamsDto {
  @ApiProperty({ example: 1, description: 'ID типа' })
  readonly id: number;

  @ApiProperty({
    example: [1, 2],
    description: 'ID параметров для создания',
    required: false,
  })
  readonly paramIdsForCreate: number[];

  @ApiProperty({
    example: [1, 2],
    description: 'ID параметров для удаления',
    required: false,
  })
  readonly paramIdsForDelete: number[];
}
