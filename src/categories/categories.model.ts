import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Product } from 'src/products/products.model';

interface CategoryCreationAttrs {
  name: string;
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID категории' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Фотоуслуги', description: 'Наименование' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({ example: 'false', description: 'В архиве или нет' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  archive: boolean;

  @HasMany(() => Product, { foreignKey: 'categoryId' })
  products: Product[];
}
