import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Changelog } from './changelogs.model';
import { CreateChangelogDto } from './dto/create-changelog.dto';
import { GetChangelogsDto } from './dto/get-changelogs.dto';
import { WhereOptions } from 'sequelize';
import { Op } from 'sequelize';
import { UpdateChangelogDto } from './dto/update-changelog.dto';

@Injectable()
export class ChangelogsService {
  constructor(
    @InjectModel(Changelog) private changelogModel: typeof Changelog,
  ) {}

  // DESKTOP
  async createChangelog(createChangelogDto: CreateChangelogDto) {
    const changelog = await this.changelogModel.create(createChangelogDto);
    return changelog;
  }

  // DESKTOP
  async getChangelogs(getChangelogsDto: GetChangelogsDto) {
    let { limit, page, search } = getChangelogsDto;
    limit = Number(limit) || 1000;
    page = Number(page) || 1;
    const offset = page * limit - limit;

    let where: WhereOptions<Changelog>;

    if (search) {
      where = { description: { [Op.like]: `%${search}%` } };
    }

    const changelogs = await this.changelogModel.findAndCountAll({
      limit,
      offset,
      distinct: true,
      order: [['id', 'DESC']],
      where,
    });
    return changelogs;
  }

  // DESKTOP
  async getChangelogByVersion(version: string) {
    const changelog = await this.changelogModel.findOne({ where: { version } });
    return changelog;
  }

  // DESKTOP
  async updateChangelog(updateChangelogDto: UpdateChangelogDto) {
    const { id } = updateChangelogDto;
    const changelog = await this.changelogModel.update(updateChangelogDto, {
      where: { id },
    });

    return changelog;
  }
}
