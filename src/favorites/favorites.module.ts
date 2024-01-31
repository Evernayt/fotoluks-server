import { AuthModule } from './../auth/auth.module';
import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FavoritesController } from './favorites.controller';
import { Favorite } from './favorites.model';
import { FavoritesService } from './favorites.service';
import { ProductsModule } from 'src/products/products.module';
import { Product } from 'src/products/products.model';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [
    SequelizeModule.forFeature([Favorite, Product]),
    ProductsModule,
    forwardRef(() => AuthModule),
  ],
})
export class FavoritesModule {}
