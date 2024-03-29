import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { EditOrderShopDto } from './dto/edit-order-shop.dto';
import { EditOrderStatusDto } from './dto/edit-order-status.dto';
import { GetOrdersForExportDto } from './dto/get-orders-for-export.dto';
import { GetOrdersDto } from './dto/get-orders.dto';
import { Order } from './orders.model';
import { OrdersService } from './orders.service';
import { IFile } from 'src/files/models/IFile';
import { FilesInterceptor } from '@nestjs/platform-express';
import getBytesByMb from 'src/common/helpers/getBytesByMb';

@ApiTags('Заказы')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Создать заказ' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FilesInterceptor('file', 100, {
      limits: { fileSize: getBytesByMb(300) },
    }),
  )
  create(
    @Body() createOrderDto: CreateOrderDto | { createOrderDto: string },
    @UploadedFiles() files: IFile[],
  ) {
    return this.ordersService.createOrder(createOrderDto, files);
  }

  @ApiOperation({ summary: 'Получить заказы' })
  @ApiResponse({ status: 200, type: [Order] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Query() getOrdersDto: GetOrdersDto) {
    return this.ordersService.getOrders(getOrdersDto);
  }

  @ApiOperation({ summary: 'Получить заказы для экспорта' })
  @ApiResponse({ status: 200, type: [Order] })
  @UseGuards(JwtAuthGuard)
  @Get('export')
  getAllForExport(@Query() getOrdersForExportDto: GetOrdersForExportDto) {
    return this.ordersService.getOrdersForExport(getOrdersForExportDto);
  }

  @ApiOperation({ summary: 'Получить заказ' })
  @ApiResponse({ status: 200, type: Order })
  @UseGuards(JwtAuthGuard)
  @Get('one/:orderId')
  getOne(@Param('orderId') orderId: number) {
    return this.ordersService.getOrder(orderId);
  }

  @ApiOperation({ summary: 'Изменить филиал заказа' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Put('shop')
  editShop(@Body() editOrderShopDto: EditOrderShopDto) {
    return this.ordersService.editOrderShop(editOrderShopDto);
  }

  @ApiOperation({ summary: 'Изменить статус заказа' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Put('status')
  editStatus(@Body() editOrderStatusDto: EditOrderStatusDto) {
    return this.ordersService.editOrderStatus(editOrderStatusDto);
  }
}
