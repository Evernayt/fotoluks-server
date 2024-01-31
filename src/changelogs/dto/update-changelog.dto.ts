import { ApiProperty } from '@nestjs/swagger';

export class UpdateChangelogDto {
  @ApiProperty({ example: 1, description: 'ID списка изменений' })
  readonly id: number;

  @ApiProperty({ example: '1.0.0', description: 'Версия', required: false })
  readonly version: string;

  @ApiProperty({ example: '', description: 'Описание', required: false })
  readonly description: string;
}
