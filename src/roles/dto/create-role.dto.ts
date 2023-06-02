import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'Админ', description: 'Наименование роли' })
  readonly name: string;

  @ApiProperty({ example: 1, description: 'Уровень доступа (1 максимальный)' })
  readonly accessLevel: number;
}
