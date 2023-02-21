import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Employee } from 'src/employees/employees.model';
import { Order } from 'src/orders/orders.model';
import { Status } from 'src/statuses/statuses.model';

interface OrderInfoCreationAttrs {
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

  @BelongsTo(() => Employee, { foreignKey: 'employeeId' })
  employee: Employee;

  @BelongsTo(() => Status, { foreignKey: 'statusId' })
  status: Status;

  @BelongsTo(() => Order, { foreignKey: 'orderId' })
  order: Order;
}
