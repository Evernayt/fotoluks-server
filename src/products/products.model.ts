import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { OrderProduct } from 'src/order-products/order-products.model';

interface ProductCreationAttrs {
  name: string;
  moyskladId: string | null;
  price: number;
  discountProhibited: boolean;
  image: string;
}

@Table({
  tableName: 'products',
  indexes: [{ type: 'FULLTEXT', fields: ['name'] }],
})
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

  @ApiProperty({
    example: 'd56d6da8-dce3-11e7-7a31-d0fd00178cbd',
    description: 'ID товара или услуги в МойСклад',
  })
  @Column({ type: DataType.STRING, unique: true, defaultValue: null })
  moyskladId: string;

  @ApiProperty({ example: 150, description: 'Цена' })
  @Column({ type: DataType.DECIMAL(11, 1), allowNull: false, defaultValue: 0 })
  price: number;

  @ApiProperty({ example: 'false', description: 'Изображение' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  discountProhibited: boolean;

  @ApiProperty({
    example: '2022-09-04 16:45:00',
    description: 'Дата синхронизации с МойСклад',
  })
  @Column({ type: DataType.DATE })
  moyskladSynchronizedAt: string;

  @ApiProperty({ example: 'https://google.com', description: 'Изображение' })
  @Column({ type: DataType.STRING, defaultValue: null })
  image: string;

  @ApiProperty({ example: 'false', description: 'В архиве или нет' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  archive: boolean;

  @HasMany(() => OrderProduct, { foreignKey: 'productId' })
  orderProducts: OrderProduct[];
}
