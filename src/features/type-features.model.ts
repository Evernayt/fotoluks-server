import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Type } from 'src/types/types.model';
import { Feature } from './features.model';

@Table({
  tableName: 'type_features',
  createdAt: false,
  updatedAt: false,
})
export class TypeFeatures extends Model<TypeFeatures> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Feature)
  @Column({ type: DataType.INTEGER })
  featureId: number;

  @ForeignKey(() => Type)
  @Column({ type: DataType.INTEGER })
  typeId: number;
}
