import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Category } from 'src/categories/categories.model';
import { Feature } from 'src/features/features.model';
import { Param } from 'src/params/params.model';
import { Type } from 'src/types/types.model';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  // DESKTOP
  async createProduct(createProductDto: CreateProductDto) {
    const product = await this.productModel.create(createProductDto);
    return product;
  }

  // DESKTOP
  async getProducts(getProductsDto: GetProductsDto) {
    let { limit, page, archive, search } = getProductsDto;
    limit = Number(limit) || 1000;
    page = Number(page) || 1;
    const offset = page * limit - limit;
    archive = String(archive) === 'true';

    let where: any = { archive };

    if (search) {
      const words = search.match(/[^ ]+/g);
      if (words) {
        const or = [];
        words.forEach((word) => {
          or.push({ [Op.like]: `%${word}%` });
        });

        where = {
          ...where,
          [Op.or]: [
            {
              name: {
                [Op.or]: or,
              },
            },
            {
              pluralName: {
                [Op.or]: or,
              },
            },
            {
              description: {
                [Op.or]: or,
              },
            },
            {
              '$types.name$': {
                [Op.or]: or,
              },
            },
          ],
        };
      }
    }

    const products = await this.productModel.findAndCountAll({
      subQuery: search ? false : undefined,
      limit: search ? undefined : limit,
      offset: search ? undefined : offset,
      distinct: true,
      order: [['name', 'ASC']],
      where,
      include: [
        {
          model: Category,
        },
        {
          model: Type,
          include: [
            {
              model: Feature,
              through: {
                attributes: [],
              },
              include: [
                {
                  model: Param,
                },
              ],
            },
          ],
        },
      ],
    });
    return products;
  }

  // DESKTOP
  async getProduct(id: number) {
    const product = await this.productModel.findOne({
      where: { id },
      include: [
        {
          model: Category,
        },
      ],
    });
    return product;
  }

  // DESKTOP
  async updateProduct(updateProductDto: UpdateProductDto) {
    const { id } = updateProductDto;
    const product = await this.productModel.update(updateProductDto, {
      where: { id },
    });
    return product;
  }
}
