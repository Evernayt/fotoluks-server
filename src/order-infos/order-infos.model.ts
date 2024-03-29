import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Employee } from 'src/employees/employees.model';
import { Order } from 'src/orders/orders.model';
import { Status } from 'src/statuses/statuses.model';

interface OrderInfoCreationAttrs {
  description: string;
  employeeId: number;
  statusId: number;
  orderId: number;
}

@Table({ tableName: 'order_infos' })
export class OrderInfo extends Model<OrderInfo, OrderInfoCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID информации заказа' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Закончилась фотобумага', description: 'Описание' })
  @Column({ type: DataType.TEXT })
  description: string;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER })
  employeeId: number;

  @ForeignKey(() => Status)
  @Column({ type: DataType.INTEGER })
  statusId: number;

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER })
  orderId: number;

  @BelongsTo(() => Employee, { foreignKey: 'employeeId' })
  employee: Employee;

  @BelongsTo(() => Status, { foreignKey: 'statusId' })
  status: Status;

  @BelongsTo(() => Order, { foreignKey: 'orderId' })
  order: Order;
}
