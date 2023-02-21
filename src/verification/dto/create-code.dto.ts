import { ApiProperty } from '@nestjs/swagger';

export class CreateCodeDto {
  @ApiProperty({ example: '88005554545', description: 'Номер телефона' })
  readonly phone: string;

  @ApiProperty({ example: '178.129.187.225', description: 'IP адрес' })
  readonly ip: string;
}
