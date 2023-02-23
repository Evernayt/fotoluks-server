import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Feature } from 'src/features/features.model';
import { CreateParamDto } from './dto/create-param.dto';
import { GetParamsDto } from './dto/get-params.dto';
import { UpdateParamDto } from './dto/update-param.dto';
import { Param } from './params.model';

@Injectable()
export class ParamsService {
  constructor(@InjectModel(Param) private paramModel: typeof Param) {}

  // DESKTOP
  async createParam(createParamDto: CreateParamDto) {
    const param = await this.paramModel.create(createParamDto);
    return param;
  }

  // DESKTOP
  async getParams(getParamsDto: GetParamsDto) {
    let { limit, page, archive, search, featureId } = getParamsDto;
    limit = Number(limit) || 1000;
    page = Number(page) || 1;
    const offset = page * limit - limit;
    archive = String(archive) === 'true';

    let where: any = { archive };

    if (featureId) {
      where = { ...where, featureId };
    }

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
              value: {
                [Op.or]: or,
              },
            },
          ],
        };
      }
    }

    const params = await this.paramModel.findAndCountAll({
      limit,
      offset,
      where,
      distinct: true,
      include: [
        {
          model: Feature,
        },
      ],
    });
    return params;
  }

  // DESKTOP
  async getParam(id: number) {
    const param = await this.paramModel.findOne({
      where: { id },
      include: [
        {
          model: Feature,
        },
      ],
    });
    return param;
  }

  // DESKTOP
  async updateParam(updateParamDto: UpdateParamDto) {
    const { id } = updateParamDto;
    const param = await this.paramModel.update(updateParamDto, {
      where: { id },
    });

    return param;
  }
}
