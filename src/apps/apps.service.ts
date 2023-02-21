import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { App } from './apps.model';
import { CreateAppDto } from './dto/create-app.dto';
import { GetAppsDto } from './dto/get-apps.dto';

@Injectable()
export class AppsService {
  constructor(@InjectModel(App) private appModel: typeof App) {}

  async createApp(createAppDto: CreateAppDto) {
    const app = await this.appModel.create(createAppDto);
    return app;
  }

  // DESKTOP
  async getApps(getAppsDto: GetAppsDto) {
    let { limit, page } = getAppsDto;
    limit = Number(limit) || 1000;
    page = Number(page) || 1;
    const offset = page * limit - limit;

    const apps = await this.appModel.findAndCountAll({
      limit,
      offset,
    });
    return apps;
  }
}
