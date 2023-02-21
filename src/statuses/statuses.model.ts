import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { OrderInfo } from 'src/order-infos/order-infos.model';
import { Order } from 'src/orders/orders.model';

interface StatusCreationAttrs {
  name: string;
  color: string;
}

@Table({ tableName: 'statuses' })
export class Status extends Model<Status, StatusCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID статуса' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Новый', description: 'Название статуса' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({ example: '#F7685B', description: 'Цвет статуса' })
  @Column({ type: DataType.STRING, allowNull: false })
  color: string;

  @HasMany(() => Order, { foreignKey: 'statusId' })
  orders: Order[];

  @HasMany(() => OrderInfo, { foreignKey: 'statusId' })
  orderInfos: OrderInfo[];
}
