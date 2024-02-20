import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from 'src/orders/orders.model';
import { Product } from 'src/products/products.model';

interface OrderProductCreationAttrs {
  price: number;
  quantity: number;
  comment: string;
  folder: string;
  discount: number;
}

@Table({ tableName: 'order_products' })
export class OrderProduct extends Model<
  OrderProduct,
  OrderProductCreationAttrs
> {
  @ApiProperty({ example: 1, description: 'ID продукта заказа' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 350, description: 'Цена' })
  @Column({ type: DataType.DECIMAL(11, 1), allowNull: false })
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

  @ApiProperty({ example: 10, description: 'Скидка' })
  @Column({ type: DataType.INTEGER, defaultValue: null })
  discount: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  productId: number;

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER })
  orderId: number;

  @BelongsTo(() => Product, { foreignKey: 'productId' })
  product: Product;

  @BelongsTo(() => Order, { foreignKey: 'orderId' })
  order: Order;
}
