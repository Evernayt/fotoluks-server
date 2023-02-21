import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { App } from './apps.model';
import { AppsService } from './apps.service';
import { CreateAppDto } from './dto/create-app.dto';
import { GetAppsDto } from './dto/get-apps.dto';

@ApiTags('Приложения')
@Controller('apps')
export class AppsController {
  constructor(private appsService: AppsService) {}

  @ApiOperation({ summary: 'Создание приложения' })
  @ApiResponse({ status: 200, type: App })
  @Post()
  create(@Body() createAppDto: CreateAppDto) {
    return this.appsService.createApp(createAppDto);
  }

  @ApiOperation({ summary: 'Получить приолжения' })
  @ApiResponse({ status: 200, type: [App] })
  @Get()
  getAll(@Query() getAppsDto: GetAppsDto) {
    return this.appsService.getApps(getAppsDto);
  }
}
