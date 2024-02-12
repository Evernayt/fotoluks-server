import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderFile } from 'src/order-files/order-files.model';

@Module({
  providers: [FilesService],
  controllers: [FilesController],
  imports: [
    SequelizeModule.forFeature([OrderFile]),
    forwardRef(() => AuthModule),
  ],
})
export class FilesModule {}
