import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface VerificationCodeCreationAttrs {
  phone: string;
  code: number;
}

@Table({ tableName: 'verification_codes' })
export class VerificationCode extends Model<
  VerificationCode,
  VerificationCodeCreationAttrs
> {
  @ApiProperty({ example: 1, description: 'ID кода верификации' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: '88005554545', description: 'Номер телефона' })
  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;

  @ApiProperty({ example: 1234, description: 'Код верификации' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  code: number;
}
