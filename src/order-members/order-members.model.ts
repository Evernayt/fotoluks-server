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

interface OrderMemberCreationAttrs {
  employeeId: number;
  orderId: number;
}

@Table({ tableName: 'order_members' })
export class OrderMember extends Model<OrderMember, OrderMemberCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID участника заказа' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER })
  orderId: number;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER })
  employeeId: number;

  @BelongsTo(() => Order, { foreignKey: 'orderId' })
  order: Order;

  @BelongsTo(() => Employee, { foreignKey: 'employeeId' })
  employee: Employee;
}
