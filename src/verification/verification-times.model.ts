import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface VerificationTimeCreationAttrs {
  ip: string;
  attemptInterval: number;
  attemptCount: number;
}

@Table({ tableName: 'verification_times' })
export class VerificationTime extends Model<
  VerificationTime,
  VerificationTimeCreationAttrs
> {
  @ApiProperty({ example: 1, description: 'ID времени верификации' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: '178.129.187.225', description: 'IP адрес' })
  @Column({ type: DataType.STRING, allowNull: false })
  ip: string;

  @ApiProperty({ example: 180, description: 'Интервал попытки' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  attemptInterval: number;

  @ApiProperty({ example: 4, description: 'Количество попыток' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  attemptCount: number;
}
