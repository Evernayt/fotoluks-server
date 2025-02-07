import { ApiProperty } from '@nestjs/swagger';

export class GetStocksByOperationDto {
  @ApiProperty({
    example: 100,
    description: 'Максимальное количество сущностей для извлечения',
    required: false,
  })
  readonly limit: number;

  @ApiProperty({
    example: 0,
    description: 'Отступ в выдаваемом списке сущностей',
    required: false,
  })
  readonly offset: number;

  @ApiProperty({
    example: '34efe2ee-015e-11e6-9464-e4de0000006b',
    description: 'ID документа',
  })
  readonly id: string;
}
