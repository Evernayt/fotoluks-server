import { AuthModule } from './../auth/auth.module';
import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FinishedProduct } from 'src/finished-products/finished-products.model';
import { OrderInfo } from 'src/order-infos/order-infos.model';
import { OrderMember } from 'src/order-members/order-members.model';
import { SelectedParam } from 'src/selected-params/selected-params.model';
import { OrdersController } from './orders.controller';
import { Order } from './orders.model';
import { OrdersService } from './orders.service';

@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
  imports: [
    SequelizeModule.forFeature([
      Order,
      OrderInfo,
      FinishedProduct,
      SelectedParam,
      OrderMember,
    ]),
    forwardRef(() => AuthModule),
  ],
})
export class OrdersModule {}
