import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Sequelize, WhereOptions } from 'sequelize';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './products.model';
import { MoyskladService } from 'src/moysklad/moysklad.service';
import { getSellingPrice } from 'src/common/helpers/moysklad';
import splitArrayIntoChunks from 'src/common/helpers/splitArrayIntoChunks';
import { IAssortment } from 'src/moysklad/models/IAssortment';
import { Literal } from 'sequelize/types/utils';
import correctSearch from 'src/common/helpers/correctSearch';
import { CreateProductsDto } from './dto/create-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productModel: typeof Product,
    private moyskladService: MoyskladService,
  ) {}

  // DESKTOP
  async createProduct(createProductDto: CreateProductDto) {
    const product = await this.productModel.create(createProductDto);
    return product;
  }

  // DESKTOP
  async createProducts(createProductsDto: CreateProductsDto) {
    const { moyskladIds } = createProductsDto;

    if (!moyskladIds) throw new Error();
    const splittedMoyskladIds = splitArrayIntoChunks(moyskladIds, 50);
    const assortments: IAssortment[] = [];
    for (const ids of splittedMoyskladIds) {
      const assortmentsData = await this.moyskladService.getAssortments({
        ids,
        archived: true,
      });
      assortments.push(...assortmentsData.rows);
    }

    const createdProducts = [];
    for (const assortment of assortments) {
      const createdProduct = {
        moyskladId: assortment.id,
        name: assortment.name,
        price: getSellingPrice(assortment.salePrices).value * 0.01,
        discountProhibited: assortment.discountProhibited,
        moyskladSynchronizedAt: new Date().toISOString(),
        archive: assortment.archived,
      };

      createdProducts.push(createdProduct);
    }
    const products = await this.productModel.bulkCreate(createdProducts, {
      ignoreDuplicates: true,
    });
    return products;
  }

  // DESKTOP
  async getProducts(getProductsDto: GetProductsDto) {
    let { limit, page, archive, search } = getProductsDto;
    limit = Number(limit) || 1000;
    page = Number(page) || 1;
    const offset = page * limit - limit;
    archive = String(archive) === 'true';
    search = correctSearch(search);

    let where: WhereOptions<Product> = { archive };
    let literalWhere: Literal;

    if (search) {
      literalWhere = Sequelize.literal(
        `MATCH(product.name) AGAINST('*${search}*' IN BOOLEAN MODE)`,
      );
    }

    const products = await this.productModel.findAndCountAll({
      limit,
      offset,
      distinct: true,
      where: [where, literalWhere],
    });
    return products;
  }

  // DESKTOP
  async getProduct(id: number) {
    const product = await this.productModel.findOne({
      where: { id },
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

  // DESKTOP
  async syncOneFromMoysklad(moyskladId: string) {
    let product = null;
    try {
      const assortmentsData = await this.moyskladService.getAssortments({
        ids: [moyskladId],
        archived: true,
      });
      if (assortmentsData?.rows.length) {
        const assortment = assortmentsData.rows[0];
        const updatedProduct = {
          name: assortment.name,
          price: getSellingPrice(assortment.salePrices).value * 0.01,
          discountProhibited: assortment.discountProhibited,
          moyskladSynchronizedAt: new Date().toISOString(),
          archive: assortment.archived,
        };
        await this.productModel.update(updatedProduct, {
          where: { moyskladId },
        });
        product = updatedProduct;
      } else {
        throw new HttpException(
          'Продукт не найден в МойСклад',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        error || 'Не удалось синхронизировать',
        HttpStatus.BAD_REQUEST,
      );
    }
    return product;
  }

  // DESKTOP
  async syncAllFromMoysklad() {
    let products = [];
    try {
      const productsImportedFromMoysklad = await this.productModel.findAll({
        where: { moyskladId: { [Op.ne]: null } },
      });

      const moyskladIds: string[] = [];
      productsImportedFromMoysklad.forEach((product) => {
        moyskladIds.push(product.moyskladId);
      });
      const splittedMoyskladIds = splitArrayIntoChunks(moyskladIds, 50);

      const assortments: IAssortment[] = [];
      for (const ids of splittedMoyskladIds) {
        const assortmentsData = await this.moyskladService.getAssortments({
          ids,
          archived: true,
        });
        assortments.push(...assortmentsData.rows);
      }

      const updatedProducts = [];
      for (const assortment of assortments) {
        const updatedProduct = {
          name: assortment.name,
          price: getSellingPrice(assortment.salePrices).value * 0.01,
          discountProhibited: assortment.discountProhibited,
          moyskladSynchronizedAt: new Date().toISOString(),
          archive: assortment.archived,
        };

        await this.productModel.update(updatedProduct, {
          where: { moyskladId: assortment.id },
        });
        updatedProducts.push(updatedProduct);
      }

      products = updatedProducts;
    } catch (error) {
      throw new HttpException(
        error || 'Не удалось синхронизировать',
        HttpStatus.BAD_REQUEST,
      );
    }
    return products;
  }
}
