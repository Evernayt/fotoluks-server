import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Favorite } from 'src/favorites/favorites.model';
import { Param } from 'src/params/params.model';

interface FavoriteParamCreationAttrs {
  favoriteId: number;
  paramId: number;
}

@Table({ tableName: 'favorite_params' })
export class FavoriteParam extends Model<
  FavoriteParam,
  FavoriteParamCreationAttrs
> {
  @ApiProperty({ example: 1, description: 'ID параметра избранного' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @BelongsTo(() => Favorite, { foreignKey: 'favoriteId' })
  favorite: Favorite;

  @BelongsTo(() => Param, { foreignKey: 'paramId' })
  param: Param;
}
