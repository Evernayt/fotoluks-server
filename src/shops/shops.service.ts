import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateShopDto } from './dto/create-shop.dto';
import { GetShopsDto } from './dto/get-shops.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Shop } from './shops.model';

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

    let where: any = { name: { [Op.ne]: 'Общий' }, archive };

    if (isIncludeGeneral) {
      where = { archive };
    }

    if (search) {
      const words = search.match(/[^ ]+/g);
      const or = [];

      for (let index = 0; index < words.length; index++) {
        or.push({ [Op.like]: '%' + words[index] + '%' });
      }

      where = {
        ...where,
        [Op.or]: [
          {
            name: {
              [Op.or]: or,
            },
          },
          {
            description: {
              [Op.or]: or,
            },
          },
          {
            address: {
              [Op.or]: or,
            },
          },
          {
            abbreviation: {
              [Op.or]: or,
            },
          },
        ],
      };
    }

    const shops = await this.shopModel.findAndCountAll({
      limit,
      offset,
      where,
      distinct: true,
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
