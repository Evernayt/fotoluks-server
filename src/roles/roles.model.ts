import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  BelongsToMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Employee } from 'src/employees/employees.model';
import { EmployeeRoles } from './employee-roles.model';

interface RoleCreationAttrs {
  name: string;
  accessLevel: number;
}

@Table({ tableName: 'roles', createdAt: false, updatedAt: false })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID роли' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Админ', description: 'Наименование роли' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 1, description: 'Уровень доступа (1 максимальный)' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  accessLevel: number;

  @BelongsToMany(() => Employee, () => EmployeeRoles)
  employees: Employee[];
}
