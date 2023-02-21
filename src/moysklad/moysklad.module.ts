import { Module } from '@nestjs/common';
import { MoyskladController } from './moysklad.controller';
import { MoyskladService } from './moysklad.service';

@Module({
  controllers: [MoyskladController],
  providers: [MoyskladService]
})
export class MoyskladModule {}
