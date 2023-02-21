import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
  @ApiProperty({ example: 1, description: 'ID пользователя', required: false })
  readonly userId: number;

  @ApiProperty({ example: 1, description: 'ID филиала', required: false })
  readonly shopId: number;

  @ApiProperty({
    example: 'false',
    description: 'Это файл для Fotoluks Manager или нет',
    required: false,
  })
  readonly isManagerFile: boolean;
}
