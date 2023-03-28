import { IMoyskladData } from 'src/moysklad/models/IMoyskladData';
import { IPosition } from 'src/moysklad/models/IPosition';
import { ISupply } from 'src/moysklad/models/ISupply';
import { $authHost } from '..';
import { EditSupplyDto } from './dto/edit-supply.dto';
import { GetSuppliesDto } from './dto/get-supplies.dto';
import { GetSupplyPositionsDto } from './dto/get-supply-positions.dto';

export default class SupplyAPI {
  static async getAll(
    getSuppliesDto: GetSuppliesDto,
  ): Promise<IMoyskladData<ISupply>> {
    let { limit, offset } = getSuppliesDto;
    limit = limit || 1000;
    offset = offset || 0;

    const { data } = await $authHost.get(
      `entity/supply/?limit=${limit}&offset=${offset}&order=created,desc`,
    );
    return data;
  }

  static async getPositions(
    getSupplyPositionsDto: GetSupplyPositionsDto,
  ): Promise<IMoyskladData<IPosition>> {
    let { limit, offset, id } = getSupplyPositionsDto;
    limit = limit || 1000;
    offset = offset || 0;

    const { data } = await $authHost.get(
      `entity/supply/${id}/positions/?expand=assortment`,
    );
    return data;
  }

  static async edit(editSupplyDto: EditSupplyDto): Promise<ISupply> {
    let { id, positions } = editSupplyDto;

    const { data } = await $authHost.put(`entity/supply/${id}`, { positions });
    return data;
  }
}
