import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Product } from 'src/products/products.model';
import { Type } from 'src/types/types.model';
import { Category } from './categories.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  // DESKTOP
  async createCategory(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryModel.create(createCategoryDto);
    return category;
  }

  // DESKTOP
  async getCategories(getCategoriesDto: GetCategoriesDto) {
    let { limit, page, archive, search } = getCategoriesDto;
    limit = Number(limit) || 1000;
    page = Number(page) || 1;
    const offset = page * limit - limit;
    archive = String(archive) === 'true';

    let where: any = { archive };

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
        ],
      };
    }

    const categories = await this.categoryModel.findAndCountAll({
      limit,
      offset,
      where,
      distinct: true,
      order: [['name', 'ASC']],
    });
    return categories;
  }

  // MOBILE
  async getCategoriesWithMinPrice() {
    const categories = await this.categoryModel.findAll({
      where: { archive: false },
      group: ['products.id'],
      include: [
        {
          model: Product,
          attributes: [
            'id',
            'name',
            'pluralName',
            'description',
            'image',
            [Sequelize.fn('MIN', Sequelize.col('price')), 'minPrice'],
          ],
          where: { archive: false },
          include: [
            {
              model: Type,
              attributes: [],
              where: { archive: false },
            },
          ],
        },
      ],
    });
    return categories;
  }

  // DESKTOP
  async getCategory(id: number) {
    const category = await this.categoryModel.findOne({ where: { id } });
    return category;
  }

  // DESKTOP
  async updateCategory(updateCategoryDto: UpdateCategoryDto) {
    const { id } = updateCategoryDto;
    const category = await this.categoryModel.update(updateCategoryDto, {
      where: { id },
    });

    return category;
  }
}
