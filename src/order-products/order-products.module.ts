import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderProduct } from './order-products.model';

@Module({
  imports: [SequelizeModule.forFeature([OrderProduct])],
})
export class OrderProductsModule {}
