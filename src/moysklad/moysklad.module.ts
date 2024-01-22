import { AuthModule } from './../auth/auth.module';
import { Module, forwardRef } from '@nestjs/common';
import { MoyskladController } from './moysklad.controller';
import { MoyskladService } from './moysklad.service';

@Module({
  controllers: [MoyskladController],
  providers: [MoyskladService],
  imports: [forwardRef(() => AuthModule)],
  exports: [MoyskladService],
})
export class MoyskladModule {}
