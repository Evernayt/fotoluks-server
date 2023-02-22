import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FavoriteParam } from './favorite-params.model';

@Module({
  imports: [SequelizeModule.forFeature([FavoriteParam])],
})
export class FavoriteParamsModule {}
