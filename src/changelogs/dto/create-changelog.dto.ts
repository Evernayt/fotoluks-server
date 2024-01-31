import { ApiProperty } from '@nestjs/swagger';

export class CreateChangelogDto {
  @ApiProperty({ example: '1.0.0', description: 'Версия' })
  readonly version: string;

  @ApiProperty({ example: '', description: 'Описание' })
  readonly description: string;
}
