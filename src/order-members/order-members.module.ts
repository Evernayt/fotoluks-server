import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderMember } from './order-members.model';

@Module({
  imports: [SequelizeModule.forFeature([OrderMember])],
})
export class OrderMembersModule {}
