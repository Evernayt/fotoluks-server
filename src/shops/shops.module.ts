import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShopsController } from './shops.controller';
import { Shop } from './shops.model';
import { ShopsService } from './shops.service';

@Module({
  controllers: [ShopsController],
  providers: [ShopsService],
  imports: [SequelizeModule.forFeature([Shop])],
})
export class ShopsModule {}
