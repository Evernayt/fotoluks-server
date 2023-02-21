import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from 'src/orders/orders.model';
import { Product } from 'src/products/products.model';
import { SelectedParam } from 'src/selected-params/selected-params.model';
import { Type } from 'src/types/types.model';

interface FinishedProductCreationAttrs {
  price: number;
  quantity: number;
  comment: string;
  folder: string;
}

@Table({ tableName: 'finished_products' })
export class FinishedProduct extends Model<
  FinishedProduct,
  FinishedProductCreationAttrs
> {
  @ApiProperty({ example: 1, description: 'ID завершенного продукта' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 350, description: 'Цена продукта' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @ApiProperty({ example: 1, description: 'Колличество' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;

  @ApiProperty({ example: '+ дизайн', description: 'Комментарий' })
  @Column({ type: DataType.TEXT, allowNull: false })
  comment: string;

  @ApiProperty({ example: '\\папка\\папка2', description: 'Путь до папки' })
  @Column({ type: DataType.TEXT, allowNull: false })
  folder: string;

  @HasMany(() => SelectedParam, { foreignKey: 'finishedProductId' })
  selectedParams: SelectedParam[];

  @BelongsTo(() => Product, { foreignKey: 'productId' })
  product: Product;

  @BelongsTo(() => Type, { foreignKey: 'typeId' })
  type: Type;

  @BelongsTo(() => Order, { foreignKey: 'orderId' })
  order: Order;
}
