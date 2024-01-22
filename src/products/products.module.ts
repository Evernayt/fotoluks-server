import { AuthModule } from './../auth/auth.module';
import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsController } from './products.controller';
import { Product } from './products.model';
import { ProductsService } from './products.service';
import { MoyskladModule } from 'src/moysklad/moysklad.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    SequelizeModule.forFeature([Product]),
    forwardRef(() => AuthModule),
    forwardRef(() => MoyskladModule),
  ],
})
export class ProductsModule {}
