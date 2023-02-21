import { ApiProperty } from '@nestjs/swagger';

export class GetTypeParamsDto {
  @ApiProperty({ example: 1, description: 'ID типа' })
  readonly id: number;

  @ApiProperty({ example: 1, description: 'ID характеристики' })
  readonly featureId: number;
}
