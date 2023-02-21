import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
  @Post('loss')
  createLoss(@Body() createLossDto: CreateLossDto) {
    return this.moyskladService.createLoss(createLossDto);
  }

  @ApiOperation({ summary: 'Получение списания' })
  @Get('loss')
  getLosses(@Query() getLossesDto: GetLossesDto) {
    return this.moyskladService.getLosses(getLossesDto);
  }

  @ApiOperation({ summary: 'Создание позиций списания' })
  @Post('loss/positions')
  createLossPosition(@Body() createLossPositionsDto: CreateLossPositionsDto) {
    return this.moyskladService.createLossPosition(createLossPositionsDto);
  }

  @ApiOperation({ summary: 'Получение позиций списания' })
  @Get('loss/positions')
  getLossPositions(@Query() getLossPositionsDto: GetLossPositionsDto) {
    return this.moyskladService.getLossPositions(getLossPositionsDto);
  }

  @ApiOperation({ summary: 'Изменение позиции списания' })
  @Put('loss/position')
  editLossPosition(@Body() editLossPositionDto: EditLossPositionDto) {
    return this.moyskladService.editLossPosition(editLossPositionDto);
  }

  @ApiOperation({ summary: 'Удалить позиции списания' })
  @Delete('loss/position')
  deleteLossPosition(@Query() deleteLossPositionDto: DeleteLossPositionDto) {
    return this.moyskladService.deleteLossPosition(deleteLossPositionDto);
  }

  // Store
  @ApiOperation({ summary: 'Получение складов' })
  @Get('store')
  getStores() {
    return this.moyskladService.getStores();
  }

  // Move
  @ApiOperation({ summary: 'Создание перемещения' })
  @Post('move')
  createMove(@Body() createMoveDto: CreateMoveDto) {
    return this.moyskladService.createMove(createMoveDto);
  }

  @ApiOperation({ summary: 'Получение перемещений' })
  @Get('move')
  getMoves(@Query() getMovesDto: GetMovesDto) {
    return this.moyskladService.getMoves(getMovesDto);
  }

  @ApiOperation({ summary: 'Создание позиций перемещения' })
  @Post('move/positions')
  createMovePosition(@Body() createMovePositionsDto: CreateMovePositionsDto) {
    return this.moyskladService.createMovePosition(createMovePositionsDto);
  }

  @ApiOperation({ summary: 'Получение позиций перемещения' })
  @Get('move/positions')
  getMovePositions(@Query() getMovePositionsDto: GetMovePositionsDto) {
    return this.moyskladService.getMovePositions(getMovePositionsDto);
  }

  @ApiOperation({ summary: 'Изменение позиции перемещения' })
  @Put('move/position')
  editMovePosition(@Body() editMovePositionDto: EditMovePositionDto) {
    return this.moyskladService.editMovePosition(editMovePositionDto);
  }

  @ApiOperation({ summary: 'Удалить позиции перемещения' })
  @Delete('move/position')
  deleteMovePosition(@Query() deleteMovePositionDto: DeleteMovePositionDto) {
    return this.moyskladService.deleteMovePosition(deleteMovePositionDto);
  }

  // Assortment
  @ApiOperation({ summary: 'Получение ассортимента' })
  @Get('assortment')
  getAssortments(@Query() getAssortmentsDto: GetAssortmentsDto) {
    return this.moyskladService.getAssortments(getAssortmentsDto);
  }

  // Notification
  @ApiOperation({ summary: 'Получение уведомлений' })
  @Get('notification')
  getNotifications(@Query() getNotificationsDto: GetNotificationsDto) {
    return this.moyskladService.getNotifications(getNotificationsDto);
  }

  // Product
  @ApiOperation({ summary: 'Получение товара' })
  @Get('product/:id')
  getProduct(@Param('id') id: string) {
    return this.moyskladService.getProduct(id);
  }

  @ApiOperation({ summary: 'Изменение товара' })
  @Put('product')
  updateProduct(@Body() updateProductDto: UpdateProductDto) {
    return this.moyskladService.updateProduct(updateProductDto);
  }

  // Variant
  @ApiOperation({ summary: 'Получение модификации' })
  @Get('variant/:id')
  getVariant(@Param('id') id: string) {
    return this.moyskladService.getVariant(id);
  }

  @ApiOperation({ summary: 'Изменение модификации' })
  @Put('variant')
  updateVariant(@Body() updateVariantDto: UpdateVariantDto) {
    return this.moyskladService.updateVariant(updateVariantDto);
  }

  // Stock
  @ApiOperation({ summary: 'Получение остатков' })
  @Get('stock')
  getStocks(@Query() getStocksDto: GetStocksDto) {
    return this.moyskladService.getStocks(getStocksDto);
  }
}
