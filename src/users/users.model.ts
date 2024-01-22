import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Order } from 'src/orders/orders.model';

interface UserCreationAttrs {
  name: string;
  phone: string;
  password: string;
}

@Table({
  tableName: 'users',
  indexes: [
    {
      type: 'FULLTEXT',
      fields: [
        'name',
        'surname',
        'patronymic',
        'phone',
        'email',
        'vk',
        'telegram',
      ],
    },
  ],
})
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID пользователя' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Иван', description: 'Имя' })
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  name: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия' })
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  surname: string;

  @ApiProperty({ example: 'Иванович', description: 'Отчество' })
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  patronymic: string;

  @ApiProperty({ example: '12345', description: 'Пароль' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: '88005554545', description: 'Номер телефона' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  phone: string;

  @ApiProperty({ example: 10, description: 'Процент скидки' })
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  discount: number;

  @ApiProperty({ example: 'ivan@mail.ru', description: 'Почтовый адрес' })
  @Column({ type: DataType.STRING })
  email: string;

  @ApiProperty({ example: 'ivan', description: 'ВКонтакте' })
  @Column({ type: DataType.STRING })
  vk: string;

  @ApiProperty({ example: 'ivan', description: 'Telegram' })
  @Column({ type: DataType.STRING })
  telegram: string;

  @ApiProperty({ example: 'https://google.com', description: 'Аватар' })
  @Column({ type: DataType.STRING, defaultValue: null })
  avatar: string;

  @ApiProperty({
    example: 'd56d6da8-dce3-11e7-7a31-d0fd00178cbd',
    description: 'ID контрагента в МойСклад',
  })
  @Column({ type: DataType.STRING, unique: true, defaultValue: null })
  moyskladId: string;

  @ApiProperty({
    example: '2022-09-04 16:45:00',
    description: 'Дата синхронизации с МойСклад',
  })
  @Column({ type: DataType.DATE })
  moyskladSynchronizedAt: string;

  @ApiProperty({ example: 'false', description: 'В архиве или нет' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  archive: boolean;

  @HasMany(() => Order, { foreignKey: 'userId' })
  orders: Order[];
}
