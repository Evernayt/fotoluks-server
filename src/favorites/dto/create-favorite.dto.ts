import { ApiProperty } from '@nestjs/swagger';
import { SelectedParam } from 'src/selected-params/selected-params.model';

export class CreateFavoriteDto {
  @ApiProperty({ example: 1, description: 'ID сотрудника' })
  readonly employeeId: number;

  @ApiProperty({ example: 1, description: 'ID типа' })
  readonly typeId: number;

  @ApiProperty({ description: 'Выбранные параметры' })
  readonly selectedParams: SelectedParam[];
}
