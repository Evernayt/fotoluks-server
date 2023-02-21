import { IMoyskladData } from 'src/moysklad/models/IMoyskladData';
import { ILoss } from 'src/moysklad/models/ILoss';
import { IPosition } from 'src/moysklad/models/IPosition';
import { $authHost } from '..';
import { CreateLossPositionsDto } from './dto/create-loss-positions.dto';
import { CreateLossDto } from './dto/create-loss.dto';
import { DeleteLossPositionDto } from './dto/delete-loss-position.dto';
import { EditLossPositionDto } from './dto/edit-loss-position.dto';
import { GetLossPositionsDto } from './dto/get-loss-positions.dto';
import { GetLossesDto } from './dto/get-losses.dto';

export default class LossAPI {
  static async create(createLossDto: CreateLossDto): Promise<ILoss> {
    const { data } = await $authHost.post('entity/loss', createLossDto);
    return data;
  }

  static async getAll(
    getLossesDto: GetLossesDto,
  ): Promise<IMoyskladData<ILoss>> {
    let { limit, offset, description, year } = getLossesDto;
    limit = limit || 1000;
    offset = offset || 0;

    const { data } = await $authHost.get(
      `entity/loss/?filter=description~${description}&filter=created>=${year}-01-01;created<=${year}-12-31&limit=${limit}&offset=${offset}`,
    );
    return data;
  }

  static async createPosition(
    createLossPositionsDto: CreateLossPositionsDto,
  ): Promise<IPosition[]> {
    const { id, positions } = createLossPositionsDto;

    const { data } = await $authHost.post(
      `entity/loss/${id}/positions`,
      positions,
    );
    return data;
  }

  static async getPositions(
    getLossPositionsDto: GetLossPositionsDto,
  ): Promise<IMoyskladData<IPosition>> {
    let { limit, offset, id } = getLossPositionsDto;
    limit = limit || 1000;
    offset = offset || 0;

    const { data } = await $authHost.get(
      `entity/loss/${id}/positions/?expand=assortment&limit=${limit}&offset=${offset}`,
    );
    return data;
  }

  static async editPosition(
    editLossPositionDto: EditLossPositionDto,
  ): Promise<IPosition> {
    const { id, positionID, quantity, price, reason } = editLossPositionDto;

    const { data } = await $authHost.put(
      `entity/loss/${id}/positions/${positionID}/?expand=assortment`,
      { quantity, price, reason },
    );
    return data;
  }

  static async deletePosition(
    deleteLossPositionDto: DeleteLossPositionDto,
  ): Promise<string> {
    const { id, positionID } = deleteLossPositionDto;

    const { data } = await $authHost.delete(
      `entity/loss/${id}/positions/${positionID}`,
    );
    return data;
  }
}
