import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderMembersController } from './order-members.controller';
import { OrderMember } from './order-members.model';
import { OrderMembersService } from './order-members.service';

@Module({
  controllers: [OrderMembersController],
  providers: [OrderMembersService],
  imports: [SequelizeModule.forFeature([OrderMember])],
})
export class OrderMembersModule {}
