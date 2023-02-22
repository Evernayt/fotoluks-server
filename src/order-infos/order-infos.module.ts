import { AuthModule } from './../auth/auth.module';
import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderInfosController } from './order-infos.controller';
import { OrderInfo } from './order-infos.model';
import { OrderInfosService } from './order-infos.service';

@Module({
  providers: [OrderInfosService],
  controllers: [OrderInfosController],
  imports: [
    SequelizeModule.forFeature([OrderInfo]),
    forwardRef(() => AuthModule),
  ],
})
export class OrderInfosModule {}
