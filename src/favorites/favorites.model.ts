import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Employee } from 'src/employees/employees.model';
import { FavoriteParam } from 'src/favorite-params/favorite-params.model';
import { Type } from 'src/types/types.model';

interface FavoriteCreationAttrs {
  employeeId: number;
  typeId: number;
}

@Table({ tableName: 'favorites' })
export class Favorite extends Model<Favorite, FavoriteCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID избранного' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @HasMany(() => FavoriteParam, { foreignKey: 'favoriteId' })
  favoriteParams: FavoriteParam[];

  @BelongsTo(() => Employee, { foreignKey: 'employeeId' })
  employee: Employee;

  @BelongsTo(() => Type, { foreignKey: 'typeId' })
  type: Type;
}
