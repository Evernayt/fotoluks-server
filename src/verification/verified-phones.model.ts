import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface VerifiedPhoneCreationAttrs {
  phone: string;
}

@Table({ tableName: 'verified_phones' })
export class VerifiedPhone extends Model<
  VerifiedPhone,
  VerifiedPhoneCreationAttrs
> {
  @ApiProperty({
    example: 1,
    description: 'ID верифицированного номера телефона',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: '88005554545', description: 'Номер телефона' })
  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;
}
