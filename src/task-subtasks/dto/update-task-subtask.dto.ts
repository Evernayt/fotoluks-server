import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskSubtaskDto {
  @ApiProperty({ example: 1, description: 'ID подзадачи' })
  readonly id: number;

  @ApiProperty({
    example: 'Подзача №1',
    description: 'Текст подзадачи',
    required: false,
  })
  readonly text: string;

  @ApiProperty({
    example: 'false',
    description: 'Завершено или нет',
    required: false,
  })
  readonly completed: boolean;
}
