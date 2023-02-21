import { ApiProperty } from '@nestjs/swagger';

export class VerificationDto {
  @ApiProperty({ example: '88005554545', description: 'Номер телефона' })
  readonly phone: string;

  @ApiProperty({ example: 1234, description: 'Код верификации' })
  readonly code: number;
}
