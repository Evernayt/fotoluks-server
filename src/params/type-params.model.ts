import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Type } from 'src/types/types.model';
import { Param } from './params.model';

@Table({
  tableName: 'type_params',
  createdAt: false,
  updatedAt: false,
})
export class TypeParams extends Model<TypeParams> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Param)
  @Column({ type: DataType.INTEGER })
  paramId: number;

  @ForeignKey(() => Type)
  @Column({ type: DataType.INTEGER })
  typeId: number;
}
