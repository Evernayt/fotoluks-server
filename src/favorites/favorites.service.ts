import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { GetFavoritesDto } from './dto/get-favorites.dto';
import { Favorite } from './favorites.model';
import { Product } from 'src/products/products.model';
import { DeleteFavoriteDto } from './dto/delete-favorite.dto';
import { WhereOptions } from 'sequelize';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite) private favoriteModel: typeof Favorite,
    @InjectModel(Product) private productModel: typeof Product,
  ) {}

  // DESKTOP
  async createFavorite(createFavoriteDto: CreateFavoriteDto) {
    const { productId } = createFavoriteDto;

    const product = await this.productModel.findByPk(productId);
    if (product.dataValues.archive) {
      throw new HttpException('Продукт в архиве', HttpStatus.BAD_REQUEST);
    }

    let favorite = await this.favoriteModel.findOne({
      where: { productId },
      include: [{ model: Product }],
    });
    if (favorite) {
      return favorite;
    } else {
      await this.favoriteModel.create(createFavoriteDto);
      favorite = await this.favoriteModel.findOne({
        where: { productId },
        include: [{ model: Product, where: { archive: false } }],
      });
      return favorite;
    }
  }

  // DESKTOP
  async getFavorites(getFavoritesDto: GetFavoritesDto) {
    let { limit, page, employeeId } = getFavoritesDto;
    limit = Number(limit) || 1000;
    page = Number(page) || 1;
    const offset = page * limit - limit;

    let where: WhereOptions<Favorite>;
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
          model: Product,
          where: { archive: false },
        },
      ],
    });
    return favorites;
  }

  // DESKTOP
  async deleteFavorite(deleteFavoriteDto: DeleteFavoriteDto) {
    const { favoriteId, productId } = deleteFavoriteDto;

    let favorite = null;
    if (productId) {
      favorite = await this.favoriteModel.destroy({
        //@ts-ignore
        where: { productId },
      });
    } else {
      favorite = await this.favoriteModel.destroy({
        where: { id: favoriteId },
      });
    }

    return favorite;
  }
}
