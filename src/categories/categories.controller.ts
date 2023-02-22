import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './categories.model';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Категории')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Создание категории' })
  @ApiResponse({ status: 200, type: Category })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @ApiOperation({ summary: 'Получить категории' })
  @ApiResponse({ status: 200, type: [Category] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Query() getCategoriesDto: GetCategoriesDto) {
    return this.categoriesService.getCategories(getCategoriesDto);
  }

  @ApiOperation({ summary: 'Получить категории с минимальной ценой' })
  @ApiResponse({ status: 200, type: [Category] })
  @Get('price')
  getAllWithMinPrice() {
    return this.categoriesService.getCategoriesWithMinPrice();
  }

  @ApiOperation({ summary: 'Получить категорию' })
  @ApiResponse({ status: 200, type: Category })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.categoriesService.getCategory(id);
  }

  @ApiOperation({ summary: 'Изменить категорию' })
  @ApiResponse({ status: 200, type: Category })
  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.updateCategory(updateCategoryDto);
  }
}
