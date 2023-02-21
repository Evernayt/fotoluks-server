import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FavoriteParamsController } from './favorite-params.controller';
import { FavoriteParam } from './favorite-params.model';
import { FavoriteParamsService } from './favorite-params.service';

@Module({
  providers: [FavoriteParamsService],
  controllers: [FavoriteParamsController],
  imports: [SequelizeModule.forFeature([FavoriteParam])],
})
export class FavoriteParamsModule {}
