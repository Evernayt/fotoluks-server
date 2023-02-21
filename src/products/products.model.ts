import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from 'src/categories/categories.model';
import { FinishedProduct } from 'src/finished-products/finished-products.model';
import { Type } from 'src/types/types.model';

interface ProductCreationAttrs {
  name: string;
  pluralName: string;
  description: string;
  image: string;
  caregoryId: number;
}

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID продукта' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Фотохолст', description: 'Наименование' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({ example: 'Фотохолсты', description: 'Наименование во мн.ч.' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  pluralName: string;

  @ApiProperty({ example: 'На подрамнике', description: 'Описание' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({ example: 'https://google.com', description: 'Изображение' })
  @Column({ type: DataType.STRING })
  image: string;

  @ApiProperty({ example: 'false', description: 'В архиве или нет' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  archive: boolean;

  @BelongsTo(() => Category, { foreignKey: 'categoryId' })
  category: Category;

  @HasMany(() => Type, { foreignKey: 'productId' })
  types: Type[];

  @HasMany(() => FinishedProduct, { foreignKey: 'productId' })
  finishedProducts: FinishedProduct[];
}
