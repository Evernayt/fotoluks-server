import { Injectable } from '@nestjs/common';
import AssortmentAPI from './api/AssortmentAPI/AssortmentAPI';
import { GetAssortmentsDto } from './api/AssortmentAPI/dto/get-assortments.dto';
import { CreateLossPositionsDto } from './api/LossAPI/dto/create-loss-positions.dto';
import { CreateLossDto } from './api/LossAPI/dto/create-loss.dto';
import { DeleteLossPositionDto } from './api/LossAPI/dto/delete-loss-position.dto';
import { EditLossPositionDto } from './api/LossAPI/dto/edit-loss-position.dto';
import { GetLossPositionsDto } from './api/LossAPI/dto/get-loss-positions.dto';
import { GetLossesDto } from './api/LossAPI/dto/get-losses.dto';
import LossAPI from './api/LossAPI/LossAPI';
import { CreateMovePositionsDto } from './api/MoveAPI/dto/create-move-positions.dto';
import { CreateMoveDto } from './api/MoveAPI/dto/create-move.dto';
import { DeleteMovePositionDto } from './api/MoveAPI/dto/delete-move-position.dto';
import { EditMovePositionDto } from './api/MoveAPI/dto/edit-move-position.dto';
import { GetMovePositionsDto } from './api/MoveAPI/dto/get-move-positions.dto';
import { GetMovesDto } from './api/MoveAPI/dto/get-moves.dto';
import MoveAPI from './api/MoveAPI/MoveAPI';
import { GetNotificationsDto } from './api/NotificationAPI/dto/get-notifications.dto';
import NotificationAPI from './api/NotificationAPI/NotificationAPI';
import { UpdateProductDto } from './api/ProductAPI/dto/update-product.dto';
import ProductAPI from './api/ProductAPI/ProductAPI';
import { GetStocksDto } from './api/StockAPI/dto/get-stocks.dto';
import StockAPI from './api/StockAPI/StockAPI';
import StoreAPI from './api/StoreAPI/StoreAPI';
import { EditSupplyDto } from './api/SupplyAPI/dto/edit-supply.dto';
import { GetSuppliesDto } from './api/SupplyAPI/dto/get-supplies.dto';
import { GetSupplyPositionsDto } from './api/SupplyAPI/dto/get-supply-positions.dto';
import SupplyAPI from './api/SupplyAPI/SupplyAPI';
import { UpdateVariantDto } from './api/VariantAPI/dto/update-variant.dto';
import VariantAPI from './api/VariantAPI/VariantAPI';

@Injectable()
export class MoyskladService {
  // Loss
  async createLoss(createLossDto: CreateLossDto) {
    const data = LossAPI.create(createLossDto);
    return data;
  }

  async getLosses(getLossesDto: GetLossesDto) {
    const data = LossAPI.getAll(getLossesDto);
    return data;
  }

  async createLossPosition(createLossPositionsDto: CreateLossPositionsDto) {
    const data = LossAPI.createPosition(createLossPositionsDto);
    return data;
  }

  async getLossPositions(getLossPositionsDto: GetLossPositionsDto) {
    const data = LossAPI.getPositions(getLossPositionsDto);
    return data;
  }

  async editLossPosition(editLossPositionDto: EditLossPositionDto) {
    const data = LossAPI.editPosition(editLossPositionDto);
    return data;
  }

  async deleteLossPosition(deleteLossPositionDto: DeleteLossPositionDto) {
    const data = LossAPI.deletePosition(deleteLossPositionDto);
    return data;
  }

  // Store
  async getStores() {
    const data = StoreAPI.getAll();
    return data;
  }

  // Move
  async createMove(createMoveDto: CreateMoveDto) {
    const data = MoveAPI.create(createMoveDto);
    return data;
  }

  async getMoves(getMovesDto: GetMovesDto) {
    const data = MoveAPI.getAll(getMovesDto);
    return data;
  }

  async createMovePosition(createMovePositionsDto: CreateMovePositionsDto) {
    const data = MoveAPI.createPosition(createMovePositionsDto);
    return data;
  }

  async getMovePositions(getMovePositionsDto: GetMovePositionsDto) {
    const data = MoveAPI.getPositions(getMovePositionsDto);
    return data;
  }

  async editMovePosition(editMovePositionDto: EditMovePositionDto) {
    const data = MoveAPI.editPosition(editMovePositionDto);
    return data;
  }

  async deleteMovePosition(deleteMovePositionDto: DeleteMovePositionDto) {
    const data = MoveAPI.deletePosition(deleteMovePositionDto);
    return data;
  }

  // Assortment
  async getAssortments(getAssortmentsDto: GetAssortmentsDto) {
    const data = AssortmentAPI.getAll(getAssortmentsDto);
    return data;
  }

  // Notification
  async getNotifications(getNotificationsDto: GetNotificationsDto) {
    const data = NotificationAPI.getAll(getNotificationsDto);
    return data;
  }

  // Product
  async getProduct(id: string) {
    const data = ProductAPI.getOne(id);
    return data;
  }

  async updateProduct(updateProductDto: UpdateProductDto) {
    const data = ProductAPI.update(updateProductDto);
    return data;
  }

  async updateProducts(products: UpdateProductDto[]) {
    const data = ProductAPI.updateMultiple(products);
    return data;
  }

  // Variant
  async getVariant(id: string) {
    const data = VariantAPI.getOne(id);
    return data;
  }

  async updateVariant(updateVariantDto: UpdateVariantDto) {
    const data = VariantAPI.update(updateVariantDto);
    return data;
  }

  // Stock
  async getStocks(getStocksDto: GetStocksDto) {
    const data = StockAPI.getAll(getStocksDto);
    return data;
  }

  // Supply
  async getSupplies(getSuppliesDto: GetSuppliesDto) {
    const data = SupplyAPI.getAll(getSuppliesDto);
    return data;
  }

  async getSupplyPositions(getSupplyPositionsDto: GetSupplyPositionsDto) {
    const data = SupplyAPI.getPositions(getSupplyPositionsDto);
    return data;
  }

  async editSupply(editSupplyDto: EditSupplyDto) {
    const data = SupplyAPI.edit(editSupplyDto);
    return data;
  }
}
