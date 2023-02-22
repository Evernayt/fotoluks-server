import { AuthModule } from './../auth/auth.module';
import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StatusesController } from './statuses.controller';
import { Status } from './statuses.model';
import { StatusesService } from './statuses.service';

@Module({
  providers: [StatusesService],
  controllers: [StatusesController],
  imports: [SequelizeModule.forFeature([Status]), forwardRef(() => AuthModule)],
})
export class StatusesModule {}
