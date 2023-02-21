import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Order } from 'src/orders/orders.model';

interface UserCreationAttrs {
  name: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID пользователя' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Иван', description: 'Имя' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: '12345', description: 'Пароль' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: '88005554545', description: 'Номер телефона' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  phone: string;

  @ApiProperty({ example: 'ivan@mail.ru', description: 'Почтовый адрес' })
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @ApiProperty({ example: 'ivan', description: 'ВКонтакте' })
  @Column({ type: DataType.STRING, allowNull: false })
  vk: string;

  @ApiProperty({ example: 'ivan', description: 'Telegram' })
  @Column({ type: DataType.STRING, allowNull: false })
  telegram: string;

  @ApiProperty({ example: 'https://google.com', description: 'Аватар' })
  @Column({ type: DataType.STRING })
  avatar: string;

  @ApiProperty({ example: 'false', description: 'В архиве или нет' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  archive: boolean;

  @HasMany(() => Order, { foreignKey: 'userId' })
  orders: Order[];
}
