import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriesController } from './categories.controller';
import { Category } from './categories.model';
import { CategoriesService } from './categories.service';

@Module({
  providers: [CategoriesService],
  controllers: [CategoriesController],
  imports: [SequelizeModule.forFeature([Category])],
})
export class CategoriesModule {}
