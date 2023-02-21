import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTypeDto } from './dto/create-type.dto';
import { GetTypeParamsDto } from './dto/get-type-params.dto';
import { GetTypesDto } from './dto/get-types.dto';
import { UpdateTypeParamsDto } from './dto/update-type-params.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from './types.model';
import { TypesService } from './types.service';

@ApiTags('Типы')
@Controller('types')
export class TypesController {
  constructor(private typesService: TypesService) {}

  @ApiOperation({ summary: 'Создание типа' })
  @ApiResponse({ status: 200, type: Type })
  @Post()
  create(@Body() createTypeDto: CreateTypeDto) {
    return this.typesService.createType(createTypeDto);
  }

  @ApiOperation({ summary: 'Получить типы' })
  @ApiResponse({ status: 200, type: [Type] })
  @Get()
  getAll(@Query() getTypesDto: GetTypesDto) {
    return this.typesService.getTypes(getTypesDto);
  }

  @ApiOperation({ summary: 'Получить параметры типа' })
  @ApiResponse({ status: 200, type: [Param] })
  // @UseGuards(JwtAuthGuard)
  @Get('params')
  getParams(@Query() getTypeParamsDto: GetTypeParamsDto) {
    return this.typesService.getTypeParams(getTypeParamsDto);
  }

  @ApiOperation({ summary: 'Получить тип' })
  @ApiResponse({ status: 200, type: Type })
  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.typesService.getType(id);
  }

  @ApiOperation({ summary: 'Изменить тип' })
  @ApiResponse({ status: 200, type: Type })
  @Put()
  update(@Body() updateTypeDto: UpdateTypeDto) {
    return this.typesService.updateType(updateTypeDto);
  }

  @ApiOperation({ summary: 'Изменить параметры типа' })
  @ApiResponse({ status: 200 })
  @Put('params')
  updateParams(@Body() updateTypeParamsDto: UpdateTypeParamsDto) {
    return this.typesService.updateTypeParams(updateTypeParamsDto);
  }
}
