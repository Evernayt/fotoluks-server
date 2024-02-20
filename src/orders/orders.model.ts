import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { OrderFile } from 'src/order-files/order-files.model';
import { OrderInfo } from 'src/order-infos/order-infos.model';
import { OrderMember } from 'src/order-members/order-members.model';
import { OrderProduct } from 'src/order-products/order-products.model';
import { Shop } from 'src/shops/shops.model';
import { Status } from 'src/statuses/statuses.model';
import { User } from 'src/users/users.model';

interface OrderCreationAttrs {
  name: string;
  sum: number;
  prepayment: number;
  deadline: string;
  comment: string;
  statusId: number;
  shopId: number;
  userId: number;
}

@Table({
  tableName: 'orders',
  indexes: [{ type: 'FULLTEXT', fields: ['comment'] }],
})
export class Order extends Model<Order, OrderCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID заказа' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 500, description: 'Сумма заказа' })
  @Column({ type: DataType.DECIMAL(11, 1), allowNull: false })
  sum: number;

  @ApiProperty({ example: 200, description: 'Предоплата заказа' })
  @Column({ type: DataType.DECIMAL(11, 1), allowNull: false })
  prepayment: number;

  @ApiProperty({ example: 10, description: 'Процент скидки' })
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  discount: number;

  @ApiProperty({ example: '2022-09-04 16:45:00', description: 'Срок заказа' })
  @Column({ type: DataType.DATE })
  deadline: string;

  @ApiProperty({ example: '+ дизайн', description: 'Комментарий заказа' })
  @Column({ type: DataType.TEXT, allowNull: false })
  comment: string;

  @ForeignKey(() => Status)
  @Column({ type: DataType.INTEGER })
  statusId: number;

  @ForeignKey(() => Shop)
  @Column({ type: DataType.INTEGER })
  shopId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => Status, { foreignKey: 'statusId' })
  status: Status;

  @BelongsTo(() => Shop, { foreignKey: 'shopId' })
  shop: Shop;

  @BelongsTo(() => User, { foreignKey: 'userId' })
  user: User;

  @HasMany(() => OrderProduct, { foreignKey: 'orderId' })
  orderProducts: OrderProduct[];

  @HasMany(() => OrderInfo, { foreignKey: 'orderId' })
  orderInfos: OrderInfo[];

  @HasMany(() => OrderMember, { foreignKey: 'orderId' })
  orderMembers: OrderMember[];

  @HasMany(() => OrderFile, { foreignKey: 'orderId' })
  orderFiles: OrderFile[];
}
