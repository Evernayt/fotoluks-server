import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FinishedProduct } from './finished-products.model';

@Module({
  imports: [SequelizeModule.forFeature([FinishedProduct])],
})
export class FinishedProductsModule {}
