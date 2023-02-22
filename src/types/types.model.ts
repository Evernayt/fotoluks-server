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
import { Favorite } from 'src/favorites/favorites.model';
import { Feature } from 'src/features/features.model';
import { TypeFeatures } from 'src/features/type-features.model';
import { FinishedProduct } from 'src/finished-products/finished-products.model';
import { Param } from 'src/params/params.model';
import { TypeParams } from 'src/params/type-params.model';
import { Product } from 'src/products/products.model';

interface TypeCreationAttrs {
  name: string;
  price: number;
  image: string;
  productId: number;
}

@Table({ tableName: 'types' })
export class Type extends Model<Type, TypeCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID типа' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: '10х15', description: 'Наименование' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 10, description: 'Цена' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @ApiProperty({ example: 'https://google.com', description: 'Изображение' })
  @Column({ type: DataType.STRING })
  image: string;

  @ApiProperty({ example: 'false', description: 'В архиве или нет' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  archive: boolean;

  @BelongsTo(() => Product, { foreignKey: 'productId' })
  product: Product;

  @BelongsToMany(() => Feature, () => TypeFeatures)
  features: Feature[];

  @BelongsToMany(() => Param, () => TypeParams)
  params: Param[];

  @HasMany(() => FinishedProduct, { foreignKey: 'typeId' })
  finishedProducts: FinishedProduct[];

  @HasMany(() => Favorite, { foreignKey: 'typeId' })
  favorites: Favorite[];
}
