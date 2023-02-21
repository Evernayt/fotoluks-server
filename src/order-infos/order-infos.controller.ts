import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetOrderInfosDto } from './dto/get-order-infos.dto';
import { GetStatisticsDto } from './dto/get-statistics.dto';
import { OrderInfo } from './order-infos.model';
import { OrderInfosService } from './order-infos.service';

@ApiTags('Информации заказов')
@Controller('order-infos')
export class OrderInfosController {
  constructor(private orderInfosService: OrderInfosService) {}

  @ApiOperation({ summary: 'Получить информацию заказов' })
  @ApiResponse({ status: 200, type: [OrderInfo] })
  @Get()
  getAll(@Query() getOrderInfosDto: GetOrderInfosDto) {
    return this.orderInfosService.getOrderInfos(getOrderInfosDto);
  }

  @ApiOperation({ summary: 'Получить статистику заказов' })
  @ApiResponse({ status: 200, type: [OrderInfo] })
  @Get('statistics')
  getAllStatistics(@Query() getStatisticsDto: GetStatisticsDto) {
    return this.orderInfosService.getStatistics(getStatisticsDto);
  }
}
