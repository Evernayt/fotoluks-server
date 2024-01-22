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
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './products.model';
import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/create-products.dto';

@ApiTags('Продукты')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ summary: 'Создание продукта' })
  @ApiResponse({ status: 200, type: Product })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @ApiOperation({ summary: 'Создание продуктов' })
  @ApiResponse({ status: 200, type: Product })
  @UseGuards(JwtAuthGuard)
  @Post('bulk')
  bulkCreate(@Body() createProductsDto: CreateProductsDto) {
    return this.productsService.createProducts(createProductsDto);
  }

  @ApiOperation({ summary: 'Получить продукты' })
  @ApiResponse({ status: 200, type: [Product] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Query() getProductsDto: GetProductsDto) {
    return this.productsService.getProducts(getProductsDto);
  }

  @ApiOperation({ summary: 'Синхронизировать все с МойСклад' })
  @UseGuards(JwtAuthGuard)
  @Get('sync')
  syncAll() {
    return this.productsService.syncAllFromMoysklad();
  }

  @ApiOperation({ summary: 'Синхронизировать с МойСклад' })
  @UseGuards(JwtAuthGuard)
  @Get('sync/:moyskladId')
  syncOne(@Param('moyskladId') moyskladId: string) {
    return this.productsService.syncOneFromMoysklad(moyskladId);
  }

  @ApiOperation({ summary: 'Получить продукт' })
  @ApiResponse({ status: 200, type: Product })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.productsService.getProduct(id);
  }

  @ApiOperation({ summary: 'Изменить продукт' })
  @ApiResponse({ status: 200, type: Product })
  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateProduct(updateProductDto);
  }
}
