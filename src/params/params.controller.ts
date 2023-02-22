import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Param as ParamNest,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateParamDto } from './dto/create-param.dto';
import { GetParamsDto } from './dto/get-params.dto';
import { UpdateParamDto } from './dto/update-param.dto';
import { Param } from './params.model';
import { ParamsService } from './params.service';

@ApiTags('Параметры')
@Controller('params')
export class ParamsController {
  constructor(private paramsService: ParamsService) {}

  @ApiOperation({ summary: 'Создание параметра' })
  @ApiResponse({ status: 200, type: Param })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createParamDto: CreateParamDto) {
    return this.paramsService.createParam(createParamDto);
  }

  @ApiOperation({ summary: 'Получить параметры' })
  @ApiResponse({ status: 200, type: [Param] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Query() getParamsDto: GetParamsDto) {
    return this.paramsService.getParams(getParamsDto);
  }

  @ApiOperation({ summary: 'Получить параметр' })
  @ApiResponse({ status: 200, type: Param })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@ParamNest('id') id: number) {
    return this.paramsService.getParam(id);
  }

  @ApiOperation({ summary: 'Изменить параметр' })
  @ApiResponse({ status: 200, type: Param })
  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() updateParamDto: UpdateParamDto) {
    return this.paramsService.updateParam(updateParamDto);
  }
}
