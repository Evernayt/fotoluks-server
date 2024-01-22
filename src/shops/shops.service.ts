import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Sequelize, WhereOptions } from 'sequelize';
import { CreateShopDto } from './dto/create-shop.dto';
import { GetShopsDto } from './dto/get-shops.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Shop } from './shops.model';
import correctSearch from 'src/common/helpers/correctSearch';
import { Literal } from 'sequelize/types/utils';

@Injectable()
export class ShopsService {
  constructor(@InjectModel(Shop) private shopModel: typeof Shop) {}

  // DESKTOP
  async createShop(createShopDto: CreateShopDto) {
    const shop = await this.shopModel.create(createShopDto);
    return shop;
  }

  // DESKTOP, MOBILE
  async getShops(getShopsDto: GetShopsDto) {
    let { limit, page, archive, isIncludeGeneral, search } = getShopsDto;
    limit = Number(limit) || 1000;
    page = Number(page) || 1;
    const offset = page * limit - limit;
    archive = String(archive) === 'true';
    isIncludeGeneral = String(isIncludeGeneral) === 'true';
    search = correctSearch(search);

    let where: WhereOptions<Shop> = { name: { [Op.ne]: 'Общий' }, archive };
    let literalWhere: Literal;

    if (isIncludeGeneral) {
      where = { archive };
    }

    if (search) {
      literalWhere = Sequelize.literal(
        `MATCH(Shop.name, description, address, abbreviation) 
        AGAINST('*${search}*' IN BOOLEAN MODE)`,
      );
    }

    const shops = await this.shopModel.findAndCountAll({
      limit,
      offset,
      distinct: true,
      where: [where, literalWhere],
    });
    return shops;
  }

  // DESKTOP
  async getShop(id: number) {
    const shop = await this.shopModel.findOne({ where: { id } });
    return shop;
  }

  // DESKTOP
  async updateShop(updateShopDto: UpdateShopDto) {
    const { id } = updateShopDto;
    const shop = await this.shopModel.update(updateShopDto, {
      where: { id },
    });

    return shop;
  }
}
