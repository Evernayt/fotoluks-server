import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { FavoriteParam } from 'src/favorite-params/favorite-params.model';
import { Feature } from 'src/features/features.model';
import { SelectedParam } from 'src/selected-params/selected-params.model';
import { Type } from 'src/types/types.model';
import { TypeParams } from './type-params.model';

interface ParamCreationAttrs {
  name: string;
  value: string;
}

@Table({ tableName: 'params' })
export class Param extends Model<Param, ParamCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID параметра' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Бордовая', description: 'Наименование' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({ example: '#800000', description: 'Значение' })
  @Column({ type: DataType.STRING, allowNull: false })
  value: string;

  @ApiProperty({ example: 'false', description: 'В архиве или нет' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  archive: boolean;

  @BelongsToMany(() => Type, () => TypeParams)
  types: Type[];

  @BelongsTo(() => Feature, { foreignKey: 'featureId' })
  feature: Feature;

  @HasMany(() => SelectedParam, { foreignKey: 'paramId' })
  selectedParams: SelectedParam[];

  @HasMany(() => FavoriteParam, { foreignKey: 'paramId' })
  favoriteParams: FavoriteParam[];
}
