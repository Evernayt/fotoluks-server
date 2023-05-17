import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationCategoryDto {
  @ApiProperty({
    example: 'Добавлен или удален из участников',
    description: 'Наименование категории',
  })
  readonly name: string;
}
