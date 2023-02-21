import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FavoriteParam } from 'src/favorite-params/favorite-params.model';
import { FavoritesController } from './favorites.controller';
import { Favorite } from './favorites.model';
import { FavoritesService } from './favorites.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [SequelizeModule.forFeature([Favorite, FavoriteParam])],
})
export class FavoritesModule {}
