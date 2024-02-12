import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderFilesService } from './order-files.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { OrderFile } from './order-files.model';
import { CreateOrderFileDto } from './dto/create-order-file.dto';
import { GetOrderFilesDto } from './dto/get-order-files.dto';

@ApiTags('Список файлов заказа')
@Controller('order-files')
export class OrderFilesController {
  constructor(private orderFilesService: OrderFilesService) {}

  @ApiOperation({ summary: 'Создание файлов заказа' })
  @ApiResponse({ status: 200, type: [OrderFile] })
  @UseGuards(JwtAuthGuard)
  @Post()
  bulkCreate(@Body() createOrderFileDto: CreateOrderFileDto[]) {
    return this.orderFilesService.createOrderFiles(createOrderFileDto);
  }

  @ApiOperation({ summary: 'Получить файлы заказа' })
  @ApiResponse({ status: 200, type: [OrderFile] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Query() getOrderFilesDto: GetOrderFilesDto) {
    return this.orderFilesService.getOrderFiles(getOrderFilesDto);
  }
}
