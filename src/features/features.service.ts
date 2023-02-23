import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { GetFeaturesDto } from './dto/get-features.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { Feature } from './features.model';

@Injectable()
export class FeaturesService {
  constructor(@InjectModel(Feature) private featureModel: typeof Feature) {}

  // DESKTOP
  async createFeature(createFeatureDto: CreateFeatureDto) {
    const feature = await this.featureModel.create(createFeatureDto);
    return feature;
  }

  // DESKTOP
  async getFeatures(getFeaturesDto: GetFeaturesDto) {
    let { limit, page, archive, search } = getFeaturesDto;
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
          ],
        };
      }
    }

    const features = await this.featureModel.findAndCountAll({
      limit,
      offset,
      where,
      distinct: true,
    });
    return features;
  }

  // DESKTOP
  async getFeature(id: number) {
    const feature = await this.featureModel.findOne({ where: { id } });
    return feature;
  }

  // DESKTOP
  async updateFeature(updateFeatureDto: UpdateFeatureDto) {
    const { id } = updateFeatureDto;
    const feature = await this.featureModel.update(updateFeatureDto, {
      where: { id },
    });

    return feature;
  }
}
