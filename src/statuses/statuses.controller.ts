import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateStatusDto } from './dto/create-status.dto';
import { GetStatusesDto } from './dto/get-statuses.dto';
import { Status } from './statuses.model';
import { StatusesService } from './statuses.service';

@ApiTags('Статусы')
@Controller('statuses')
export class StatusesController {
  constructor(private statusesService: StatusesService) {}

  @ApiOperation({ summary: 'Создание статуса' })
  @ApiResponse({ status: 200, type: Status })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusesService.createStatus(createStatusDto);
  }

  @ApiOperation({ summary: 'Получить статусы' })
  @ApiResponse({ status: 200, type: [Status] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Query() getStatusesDto: GetStatusesDto) {
    return this.statusesService.getStatuses(getStatusesDto);
  }
}
