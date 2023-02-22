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
import { CreateShopDto } from './dto/create-shop.dto';
import { GetShopsDto } from './dto/get-shops.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Shop } from './shops.model';
import { ShopsService } from './shops.service';

@ApiTags('Филиалы')
@Controller('shops')
export class ShopsController {
  constructor(private shopsService: ShopsService) {}

  @ApiOperation({ summary: 'Создание филиала' })
  @ApiResponse({ status: 200, type: Shop })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopsService.createShop(createShopDto);
  }

  @ApiOperation({ summary: 'Получить филиалы' })
  @ApiResponse({ status: 200, type: [Shop] })
  @Get()
  getAll(@Query() getShopsDto: GetShopsDto) {
    return this.shopsService.getShops(getShopsDto);
  }

  @ApiOperation({ summary: 'Получить филиал' })
  @ApiResponse({ status: 200, type: Shop })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.shopsService.getShop(id);
  }

  @ApiOperation({ summary: 'Изменить филиал' })
  @ApiResponse({ status: 200, type: Shop })
  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() updateShopDto: UpdateShopDto) {
    return this.shopsService.updateShop(updateShopDto);
  }
}
