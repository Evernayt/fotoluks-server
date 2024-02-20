import { Module, forwardRef } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { AuthModule } from 'src/auth/auth.module';
import { Employee } from 'src/employees/employees.model';
import { EmployeeRoles } from './employee-roles.model';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([Role, Employee, EmployeeRoles]),
    forwardRef(() => AuthModule),
  ],
})
export class RolesModule {}
