import { Module, forwardRef } from '@nestjs/common';
import { OrderFilesService } from './order-files.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderFile } from './order-files.model';
import { AuthModule } from 'src/auth/auth.module';
import { OrderFilesController } from './order-files.controller';

@Module({
  providers: [OrderFilesService],
  controllers: [OrderFilesController],
  imports: [
    SequelizeModule.forFeature([OrderFile]),
    forwardRef(() => AuthModule),
  ],
})
export class OrderFilesModule {}
