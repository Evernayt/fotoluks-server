import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskSubtaskDto {
  @ApiProperty({ example: 'Подзача №1', description: 'Текст подзадачи' })
  readonly text: string;

  @ApiProperty({ example: 1, description: 'ID задачи' })
  readonly taskId: number;
}
