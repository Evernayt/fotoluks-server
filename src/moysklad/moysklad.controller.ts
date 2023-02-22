import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetAssortmentsDto } from './api/AssortmentAPI/dto/get-assortments.dto';
import { CreateLossPositionsDto } from './api/LossAPI/dto/create-loss-positions.dto';
import { CreateLossDto } from './api/LossAPI/dto/create-loss.dto';
import { DeleteLossPositionDto } from './api/LossAPI/dto/delete-loss-position.dto';
import { EditLossPositionDto } from './api/LossAPI/dto/edit-loss-position.dto';
import { GetLossPositionsDto } from './api/LossAPI/dto/get-loss-positions.dto';
import { GetLossesDto } from './api/LossAPI/dto/get-losses.dto';
import { CreateMovePositionsDto } from './api/MoveAPI/dto/create-move-positions.dto';
import { CreateMoveDto } from './api/MoveAPI/dto/create-move.dto';
import { DeleteMovePositionDto } from './api/MoveAPI/dto/delete-move-position.dto';
import { EditMovePositionDto } from './api/MoveAPI/dto/edit-move-position.dto';
import { GetMovePositionsDto } from './api/MoveAPI/dto/get-move-positions.dto';
import { GetMovesDto } from './api/MoveAPI/dto/get-moves.dto';
import { GetNotificationsDto } from './api/NotificationAPI/dto/get-notifications.dto';
import { UpdateProductDto } from './api/ProductAPI/dto/update-product.dto';
import { GetStocksDto } from './api/StockAPI/dto/get-stocks.dto';
import { UpdateVariantDto } from './api/VariantAPI/dto/update-variant.dto';
import { MoyskladService } from './moysklad.service';

@ApiTags('МойСклад')
@Controller('moysklad')
export class MoyskladController {
  constructor(private moyskladService: MoyskladService) {}

  // Loss
  @ApiOperation({ summary: 'Создание списания' })
  @UseGuards(JwtAuthGuard)
  @Post('loss')
  createLoss(@Body() createLossDto: CreateLossDto) {
    return this.moyskladService.createLoss(createLossDto);
  }

  @ApiOperation({ summary: 'Получение списания' })
  @UseGuards(JwtAuthGuard)
  @Get('loss')
  getLosses(@Query() getLossesDto: GetLossesDto) {
    return this.moyskladService.getLosses(getLossesDto);
  }

  @ApiOperation({ summary: 'Создание позиций списания' })
  @UseGuards(JwtAuthGuard)
  @Post('loss/positions')
  createLossPosition(@Body() createLossPositionsDto: CreateLossPositionsDto) {
    return this.moyskladService.createLossPosition(createLossPositionsDto);
  }

  @ApiOperation({ summary: 'Получение позиций списания' })
  @UseGuards(JwtAuthGuard)
  @Get('loss/positions')
  getLossPositions(@Query() getLossPositionsDto: GetLossPositionsDto) {
    return this.moyskladService.getLossPositions(getLossPositionsDto);
  }

  @ApiOperation({ summary: 'Изменение позиции списания' })
  @UseGuards(JwtAuthGuard)
  @Put('loss/position')
  editLossPosition(@Body() editLossPositionDto: EditLossPositionDto) {
    return this.moyskladService.editLossPosition(editLossPositionDto);
  }

  @ApiOperation({ summary: 'Удалить позиции списания' })
  @UseGuards(JwtAuthGuard)
  @Delete('loss/position')
  deleteLossPosition(@Query() deleteLossPositionDto: DeleteLossPositionDto) {
    return this.moyskladService.deleteLossPosition(deleteLossPositionDto);
  }

  // Store
  @ApiOperation({ summary: 'Получение складов' })
  @UseGuards(JwtAuthGuard)
  @Get('store')
  getStores() {
    return this.moyskladService.getStores();
  }

  // Move
  @ApiOperation({ summary: 'Создание перемещения' })
  @UseGuards(JwtAuthGuard)
  @Post('move')
  createMove(@Body() createMoveDto: CreateMoveDto) {
    return this.moyskladService.createMove(createMoveDto);
  }

  @ApiOperation({ summary: 'Получение перемещений' })
  @UseGuards(JwtAuthGuard)
  @Get('move')
  getMoves(@Query() getMovesDto: GetMovesDto) {
    return this.moyskladService.getMoves(getMovesDto);
  }

  @ApiOperation({ summary: 'Создание позиций перемещения' })
  @UseGuards(JwtAuthGuard)
  @Post('move/positions')
  createMovePosition(@Body() createMovePositionsDto: CreateMovePositionsDto) {
    return this.moyskladService.createMovePosition(createMovePositionsDto);
  }

  @ApiOperation({ summary: 'Получение позиций перемещения' })
  @UseGuards(JwtAuthGuard)
  @Get('move/positions')
  getMovePositions(@Query() getMovePositionsDto: GetMovePositionsDto) {
    return this.moyskladService.getMovePositions(getMovePositionsDto);
  }

  @ApiOperation({ summary: 'Изменение позиции перемещения' })
  @UseGuards(JwtAuthGuard)
  @Put('move/position')
  editMovePosition(@Body() editMovePositionDto: EditMovePositionDto) {
    return this.moyskladService.editMovePosition(editMovePositionDto);
  }

  @ApiOperation({ summary: 'Удалить позиции перемещения' })
  @UseGuards(JwtAuthGuard)
  @Delete('move/position')
  deleteMovePosition(@Query() deleteMovePositionDto: DeleteMovePositionDto) {
    return this.moyskladService.deleteMovePosition(deleteMovePositionDto);
  }

  // Assortment
  @ApiOperation({ summary: 'Получение ассортимента' })
  @UseGuards(JwtAuthGuard)
  @Get('assortment')
  getAssortments(@Query() getAssortmentsDto: GetAssortmentsDto) {
    return this.moyskladService.getAssortments(getAssortmentsDto);
  }

  // Notification
  @ApiOperation({ summary: 'Получение уведомлений' })
  @UseGuards(JwtAuthGuard)
  @Get('notification')
  getNotifications(@Query() getNotificationsDto: GetNotificationsDto) {
    return this.moyskladService.getNotifications(getNotificationsDto);
  }

  // Product
  @ApiOperation({ summary: 'Получение товара' })
  @UseGuards(JwtAuthGuard)
  @Get('product/:id')
  getProduct(@Param('id') id: string) {
    return this.moyskladService.getProduct(id);
  }

  @ApiOperation({ summary: 'Изменение товара' })
  @UseGuards(JwtAuthGuard)
  @Put('product')
  updateProduct(@Body() updateProductDto: UpdateProductDto) {
    return this.moyskladService.updateProduct(updateProductDto);
  }

  // Variant
  @ApiOperation({ summary: 'Получение модификации' })
  @UseGuards(JwtAuthGuard)
  @Get('variant/:id')
  getVariant(@Param('id') id: string) {
    return this.moyskladService.getVariant(id);
  }

  @ApiOperation({ summary: 'Изменение модификации' })
  @UseGuards(JwtAuthGuard)
  @Put('variant')
  updateVariant(@Body() updateVariantDto: UpdateVariantDto) {
    return this.moyskladService.updateVariant(updateVariantDto);
  }

  // Stock
  @ApiOperation({ summary: 'Получение остатков' })
  @UseGuards(JwtAuthGuard)
  @Get('stock')
  getStocks(@Query() getStocksDto: GetStocksDto) {
    return this.moyskladService.getStocks(getStocksDto);
  }
}
