import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FavoriteParam } from 'src/favorite-params/favorite-params.model';
import { Feature } from 'src/features/features.model';
import { Param } from 'src/params/params.model';
import { Product } from 'src/products/products.model';
import { Type } from 'src/types/types.model';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { GetFavoritesDto } from './dto/get-favorites.dto';
import { Favorite } from './favorites.model';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite) private favoriteModel: typeof Favorite,
    @InjectModel(FavoriteParam)
    private favoriteParamModel: typeof FavoriteParam,
  ) {}

  // DESKTOP
  async createFavorite(createFavoriteDto: CreateFavoriteDto) {
    const { typeId, employeeId, selectedParams } = createFavoriteDto;

    const favorite = await this.favoriteModel.create({ typeId, employeeId });

    const favoriteParams = [];
    for (let i = 0; i < selectedParams.length; i++) {
      favoriteParams.push({
        paramId: selectedParams[i].param.id,
        favoriteId: favorite.id,
      });
    }
    await this.favoriteParamModel.bulkCreate(favoriteParams);

    const foundFavorite = await this.favoriteModel.findOne({
      where: { id: favorite.id },
      include: [
        {
          model: Type,
          include: [
            {
              model: Product,
            },
          ],
        },
        {
          model: FavoriteParam,
          include: [
            {
              model: Param,
              include: [
                {
                  model: Feature,
                },
              ],
            },
          ],
        },
      ],
    });

    return foundFavorite;
  }

  // DESKTOP
  async getFavorites(getFavoritesDto: GetFavoritesDto) {
    let { limit, page, employeeId } = getFavoritesDto;
    limit = Number(limit) || 1000;
    page = Number(page) || 1;
    const offset = page * limit - limit;

    let where: any;
    if (employeeId) {
      where = { employeeId };
    }

    const favorites = await this.favoriteModel.findAndCountAll({
      limit,
      offset,
      where,
      distinct: true,
      include: [
        {
          model: Type,
          where: { archive: false },
          include: [
            {
              model: Product,
              where: { archive: false },
            },
          ],
        },
        {
          model: FavoriteParam,
          include: [
            {
              model: Param,
              include: [
                {
                  model: Feature,
                },
              ],
            },
          ],
        },
      ],
    });
    return favorites;
  }

  // DESKTOP
  async deleteFavorite(id: number) {
    const whereParam = { favoriteId: id };
    await this.favoriteParamModel.destroy({
      where: whereParam,
    });

    const favorite = await this.favoriteModel.destroy({
      where: { id },
    });

    return favorite;
  }
}
