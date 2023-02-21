import { ApiProperty } from '@nestjs/swagger';

export class CreateStatusDto {
  @ApiProperty({ example: 'Новый', description: 'Название статуса' })
  readonly name: string;

  @ApiProperty({ example: '#F7685B', description: 'Цвет статуса' })
  readonly color: string;
}
