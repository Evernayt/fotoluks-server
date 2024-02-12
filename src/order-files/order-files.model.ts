import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { OrderProduct } from 'src/order-products/order-products.model';
import { Order } from 'src/orders/orders.model';

interface OrderFileCreationAttrs {
  link: string;
  orderId: number;
}

@Table({ tableName: 'order_files' })
export class OrderFile extends Model<OrderFile, OrderFileCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID файла заказа' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'https://google.com', description: 'Ссылка' })
  @Column({ type: DataType.STRING })
  link: string;

  @ApiProperty({ example: 'Файл.jpg', description: 'Название файла' })
  @Column({ type: DataType.STRING })
  name: string;

  @ApiProperty({ example: 1024, description: 'Размер файла' })
  @Column({ type: DataType.INTEGER })
  size: number;

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER })
  orderId: number;

  @ForeignKey(() => OrderProduct)
  @Column({ type: DataType.INTEGER })
  orderProductId: number;

  @BelongsTo(() => Order, { foreignKey: 'orderId' })
  order: Order;

  @BelongsTo(() => OrderProduct, { foreignKey: 'orderProductId' })
  orderProduct: OrderProduct;
}
