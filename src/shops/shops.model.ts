import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Order } from 'src/orders/orders.model';
import { Task } from 'src/tasks/tasks.model';

interface ShopCreationAttrs {
  name: string;
  description: string;
  address: string;
  abbreviation: string;
}

@Table({ tableName: 'shops', createdAt: false, updatedAt: false })
export class Shop extends Model<Shop, ShopCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID филиала' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Луначарского', description: 'Наименование' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({ example: 'Напротив «Школа №4»', description: 'Описание' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({
    example: 'Туймзаы, ул. Луначарского 41',
    description: 'Адрес',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  address: string;

  @ApiProperty({
    example: 'Луна',
    description: 'Аббревиатура',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  abbreviation: string;

  @ApiProperty({ example: 'false', description: 'В архиве или нет' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  archive: boolean;

  @HasMany(() => Order, { foreignKey: 'shopId' })
  orders: Order[];

  @HasMany(() => Task, { foreignKey: 'shopId' })
  tasks: Task[];
}
