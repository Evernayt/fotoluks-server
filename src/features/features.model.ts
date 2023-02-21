import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Param } from 'src/params/params.model';
import { Type } from 'src/types/types.model';
import { TypeFeatures } from './type-features.model';

interface FeatureCreationAttrs {
  name: string;
  pluralName: string;
}

@Table({ tableName: 'features' })
export class Feature extends Model<Feature, FeatureCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID типа' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Цвет', description: 'Наименование' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({ example: 'Цвета', description: 'Наименование во мн.ч.' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  pluralName: string;

  @ApiProperty({ example: 'false', description: 'В архиве или нет' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  archive: boolean;

  @BelongsToMany(() => Type, () => TypeFeatures)
  types: Type[];

  @HasMany(() => Param, { foreignKey: 'featureId' })
  params: Param[];
}
