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
import { Product } from 'src/products/products.model';

interface FavoriteCreationAttrs {
  employeeId: number;
  productId: number;
}

@Table({ tableName: 'favorites' })
export class Favorite extends Model<Favorite, FavoriteCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID избранного' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER })
  employeeId: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  productId: number;

  @BelongsTo(() => Employee, { foreignKey: 'employeeId' })
  employee: Employee;

  @BelongsTo(() => Product, { foreignKey: 'productId' })
  product: Product;
}
