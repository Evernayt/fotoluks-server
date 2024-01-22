import { IMoyskladData } from 'src/moysklad/models/IMoyskladData';
import { IMove } from 'src/moysklad/models/IMove';
import { IPosition } from 'src/moysklad/models/IPosition';
import { $authHost } from '..';
import { CreateMovePositionsDto } from './dto/create-move-positions.dto';
import { CreateMoveDto } from './dto/create-move.dto';
import { DeleteMovePositionDto } from './dto/delete-move-position.dto';
import { EditMovePositionDto } from './dto/edit-move-position.dto';
import { GetMovePositionsDto } from './dto/get-move-positions.dto';
import { GetMovesDto } from './dto/get-moves.dto';
import OrganizationAPI from '../OrganizationAPI/OrganizationAPI';
import { EditMoveDto } from './dto/edit-move.dto';

export default class MoveAPI {
  static async create(createMoveDto: CreateMoveDto): Promise<IMove> {
    const organization = await OrganizationAPI.getAll();
    if (!organization.rows.length) return;

    const { data } = await $authHost.post('entity/move', {
      ...createMoveDto,
      organization: organization.rows[0],
    });
    return data;
  }

  static async edit(editMoveDto: EditMoveDto): Promise<IMove> {
    const organization = await OrganizationAPI.getAll();
    if (!organization.rows.length) return;

    let { id, sourceStore, targetStore, description } = editMoveDto;

    const { data } = await $authHost.put(`entity/move/${id}`, {
      sourceStore,
      targetStore,
      description,
      organization: organization.rows[0],
    });
    return data;
  }

  static async getAll(getMovesDto: GetMovesDto): Promise<IMoyskladData<IMove>> {
    let { limit, offset, description, search } = getMovesDto;
    limit = limit || 1000;
    offset = offset || 0;

    let url = `entity/move/?limit=${limit}&offset=${offset}&order=created,desc`;
    if (description) {
      url += `&filter=description=${description}`;
    }
    if (search) {
      url += `&search=${search}`;
    }

    const { data } = await $authHost.get(url);
    return data;
  }

  static async getOne(moveId: string): Promise<IMove> {
    const { data } = await $authHost.get(`entity/move/${moveId}`);
    return data;
  }

  static async createPosition(
    createMovePositionsDto: CreateMovePositionsDto,
  ): Promise<IPosition[]> {
    const { id, positions } = createMovePositionsDto;

    const { data } = await $authHost.post(
      `entity/move/${id}/positions/?expand=assortment`,
      positions,
    );
    return data;
  }

  static async getPositions(
    getMovePositionsDto: GetMovePositionsDto,
  ): Promise<IMoyskladData<IPosition>> {
    let { limit, offset, id } = getMovePositionsDto;
    limit = limit || 1000;
    offset = offset || 0;

    const { data } = await $authHost.get(
      `entity/move/${id}/positions/?expand=assortment&limit=${limit}&offset=${offset}`,
    );
    return data;
  }

  static async editPosition(
    editMovePositionDto: EditMovePositionDto,
  ): Promise<IPosition> {
    const { id, positionId, quantity } = editMovePositionDto;

    const { data } = await $authHost.put(
      `entity/move/${id}/positions/${positionId}/?expand=assortment`,
      { quantity },
    );
    return data;
  }

  static async deletePosition(
    deleteMovePositionDto: DeleteMovePositionDto,
  ): Promise<string> {
    const { id, positionId } = deleteMovePositionDto;

    const { data } = await $authHost.delete(
      `entity/move/${id}/positions/${positionId}`,
    );
    return data;
  }
}
