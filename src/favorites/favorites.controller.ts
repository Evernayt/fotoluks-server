import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { GetFavoritesDto } from './dto/get-favorites.dto';
import { Favorite } from './favorites.model';
import { FavoritesService } from './favorites.service';

@ApiTags('Избранное')
@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @ApiOperation({ summary: 'Создание избранного' })
  @ApiResponse({ status: 200, type: Favorite })
  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.createFavorite(createFavoriteDto);
  }

  @ApiOperation({ summary: 'Получение избранных' })
  @ApiResponse({ status: 200, type: [Favorite] })
  @Get()
  getAll(@Query() getFavoritesDto: GetFavoritesDto) {
    return this.favoritesService.getFavorites(getFavoritesDto);
  }

  @ApiOperation({ summary: 'Удаление избранного' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.favoritesService.deleteFavorite(id);
  }
}
