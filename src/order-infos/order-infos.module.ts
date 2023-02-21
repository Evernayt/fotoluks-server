import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderInfosController } from './order-infos.controller';
import { OrderInfo } from './order-infos.model';
import { OrderInfosService } from './order-infos.service';

@Module({
  providers: [OrderInfosService],
  controllers: [OrderInfosController],
  imports: [SequelizeModule.forFeature([OrderInfo])],
})
export class OrderInfosModule {}
