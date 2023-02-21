import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Category } from 'src/categories/categories.model';
import { Feature } from 'src/features/features.model';
import { TypeFeatures } from 'src/features/type-features.model';
import { Param } from 'src/params/params.model';
import { TypeParams } from 'src/params/type-params.model';
import { Product } from 'src/products/products.model';
import { CreateTypeDto } from './dto/create-type.dto';
import { GetTypeParamsDto } from './dto/get-type-params.dto';
import { GetTypesDto } from './dto/get-types.dto';
import { UpdateTypeParamsDto } from './dto/update-type-params.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from './types.model';

@Injectable()
export class TypesService {
  constructor(
    @InjectModel(Type) private typeModel: typeof Type,
    @InjectModel(TypeFeatures) private typeFeaturesModel: typeof TypeFeatures,
    @InjectModel(TypeParams) private typeParamsModel: typeof TypeParams,
  ) {}

  // DESKTOP
  async createType(createTypeDto: CreateTypeDto) {
    const { featureIds } = createTypeDto;

    const type = await this.typeModel.create(createTypeDto);

    if (featureIds) {
      const typeFeatureData = [];
      for (let i = 0; i < featureIds.length; i++) {
        typeFeatureData.push({
          typeId: type.id,
          featureId: featureIds[i],
        });
      }
      if (typeFeatureData.length) {
        await this.typeFeaturesModel.bulkCreate(typeFeatureData);
      }
    }

    return type;
  }

  // DESKTOP
  async getTypes(getTypesDto: GetTypesDto) {
    let { limit, page, archive, productId, search } = getTypesDto;
    limit = Number(limit) || 1000;
    page = Number(page) || 1;
    const offset = page * limit - limit;
    archive = String(archive) === 'true';

    let where: any = { archive };

    if (productId) {
      where = { ...where, productId };
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
            price: {
              [Op.or]: or,
            },
          },
        ],
      };
    }

    const types = await this.typeModel.findAndCountAll({
      limit,
      offset,
      where,
      distinct: true,
      order: [['name', 'ASC']],
      include: [
        {
          model: Param,
          through: {
            attributes: [],
          },
          include: [
            {
              model: Feature,
            },
          ],
        },
        {
          model: Product,
          include: [
            {
              model: Category,
            },
          ],
        },
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
    });
    return types;
  }

  // DESKTOP
  async getType(id: number) {
    const type = await this.typeModel.findOne({
      where: { id },
      include: [
        {
          model: Product,
          include: [
            {
              model: Category,
            },
          ],
        },
        {
          model: Feature,
          through: {
            attributes: [],
          },
        },
      ],
    });
    return type;
  }

  // DESKTOP
  async updateType(updateTypeDto: UpdateTypeDto) {
    const { id, featureIds } = updateTypeDto;
    const type = await this.typeModel.update(updateTypeDto, {
      where: { id },
    });

    if (featureIds?.length) {
      await this.typeFeaturesModel.destroy({ where: { typeId: id } });
      const typeFeatureData = [];
      featureIds.forEach((featureId) => {
        typeFeatureData.push({
          typeId: id,
          featureId,
        });
      });

      await this.typeFeaturesModel.bulkCreate(typeFeatureData);
    }

    return type;
  }

  // DESKTOP
  async getTypeParams(getTypeParamsDto: GetTypeParamsDto) {
    const { id, featureId } = getTypeParamsDto;

    const type = await this.typeModel.findOne({
      where: { id },
      attributes: [],
      include: [
        {
          model: Param,
          through: {
            attributes: [],
          },
          include: [
            {
              model: Feature,
              where: { id: featureId },
              attributes: [],
            },
          ],
        },
      ],
    });
    return type.params;
  }

  // DESKTOP
  async updateTypeParams(updateTypeParamsDto: UpdateTypeParamsDto) {
    const { id, paramIdsForCreate, paramIdsForDelete } = updateTypeParamsDto;

    await this.typeParamsModel.destroy({
      where: { typeId: id, paramId: paramIdsForDelete },
    });

    const typeParamData = [];
    paramIdsForCreate.forEach((paramId) => {
      typeParamData.push({ typeId: id, paramId });
    });
    const typeParams = await this.typeParamsModel.bulkCreate(typeParamData);

    return typeParams;
  }
}
