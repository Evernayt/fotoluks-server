import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FinishedProductsController } from './finished-products.controller';
import { FinishedProduct } from './finished-products.model';
import { FinishedProductsService } from './finished-products.service';

@Module({
  providers: [FinishedProductsService],
  controllers: [FinishedProductsController],
  imports: [SequelizeModule.forFeature([FinishedProduct])],
})
export class FinishedProductsModule {}
