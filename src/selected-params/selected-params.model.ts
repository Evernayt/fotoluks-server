import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { FinishedProduct } from 'src/finished-products/finished-products.model';
import { Param } from 'src/params/params.model';

interface SelectedParamCreationAttrs {
  finishedProductId: number;
  paramId: number;
}

@Table({ tableName: 'selected_params' })
export class SelectedParam extends Model<
  SelectedParam,
  SelectedParamCreationAttrs
> {
  @ApiProperty({ example: 1, description: 'ID выбранного параметра' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @BelongsTo(() => FinishedProduct, { foreignKey: 'finishedProductId' })
  finishedProduct: FinishedProduct;

  @BelongsTo(() => Param, { foreignKey: 'paramId' })
  param: Param;
}
