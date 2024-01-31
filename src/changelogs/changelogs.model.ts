import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ChangelogCreationAttrs {
  version: string;
  description: string;
}

@Table({ tableName: 'changelogs' })
export class Changelog extends Model<Changelog, ChangelogCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID списка изменений' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: '1.0.0', description: 'Версия' })
  @Column({ type: DataType.STRING, allowNull: false })
  version: string;

  @ApiProperty({ example: '', description: 'Описание' })
  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;
}
