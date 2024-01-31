import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { Report } from './reports.model';
import { CreateReportDto } from './dto/create-report.dto';
import { GetReportsDto } from './dto/get-reports.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@ApiTags('Отзывы')
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @ApiOperation({ summary: 'Создание отзыва' })
  @ApiResponse({ status: 200, type: Report })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.createReport(createReportDto);
  }

  @ApiOperation({ summary: 'Получить отзывы' })
  @ApiResponse({ status: 200, type: [Report] })
  @Get()
  getAll(@Query() getReportsDto: GetReportsDto) {
    return this.reportsService.getReports(getReportsDto);
  }

  @ApiOperation({ summary: 'Изменить отзыв' })
  @ApiResponse({ status: 200, type: Report })
  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.updateReport(updateReportDto);
  }
}
