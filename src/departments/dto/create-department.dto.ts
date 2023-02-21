import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({ example: 'Фото', description: 'Наименование отдела' })
  readonly name: string;
}
