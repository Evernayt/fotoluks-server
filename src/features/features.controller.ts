import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { GetFeaturesDto } from './dto/get-features.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { Feature } from './features.model';
import { FeaturesService } from './features.service';

@ApiTags('Характеристики')
@Controller('features')
export class FeaturesController {
  constructor(private featuresService: FeaturesService) {}

  @ApiOperation({ summary: 'Создание характеристики' })
  @ApiResponse({ status: 200, type: Feature })
  @Post()
  create(@Body() createFeatureDto: CreateFeatureDto) {
    return this.featuresService.createFeature(createFeatureDto);
  }

  @ApiOperation({ summary: 'Получить характеристики' })
  @ApiResponse({ status: 200, type: [Feature] })
  @Get()
  getAll(@Query() getFeaturesDto: GetFeaturesDto) {
    return this.featuresService.getFeatures(getFeaturesDto);
  }

  @ApiOperation({ summary: 'Получить характеристику' })
  @ApiResponse({ status: 200, type: Feature })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.featuresService.getFeature(id);
  }

  @ApiOperation({ summary: 'Изменить характеристику' })
  @ApiResponse({ status: 200, type: Feature })
  @Put()
  update(@Body() updateFeatureDto: UpdateFeatureDto) {
    return this.featuresService.updateFeature(updateFeatureDto);
  }
}
