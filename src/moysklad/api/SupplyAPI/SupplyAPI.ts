import { IMoyskladData } from 'src/moysklad/models/IMoyskladData';
import { IPosition } from 'src/moysklad/models/IPosition';
import { ISupply } from 'src/moysklad/models/ISupply';
import { $authHost } from '..';
import { EditSupplyDto } from './dto/edit-supply.dto';
import { GetSuppliesDto } from './dto/get-supplies.dto';
import { GetSupplyPositionsDto } from './dto/get-supply-positions.dto';
import { CreateSupplyDto } from './dto/create-supply.dto';
import OrganizationAPI from '../OrganizationAPI/OrganizationAPI';
import { CreateSupplyPositionsDto } from './dto/create-supply-positions.dto';

export default class SupplyAPI {
  static async create(createSupplyDto: CreateSupplyDto): Promise<ISupply> {
    const organization = await OrganizationAPI.getAll();
    if (!organization.rows.length) return;

    const { data } = await $authHost.post('entity/supply', {
      ...createSupplyDto,
      organization: organization.rows[0],
    });
    return data;
  }

  static async createPosition(
    createSupplyPositionsDto: CreateSupplyPositionsDto,
  ): Promise<IPosition[]> {
    const { id, positions } = createSupplyPositionsDto;

    const { data } = await $authHost.post(
      `entity/supply/${id}/positions/?expand=assortment`,
      positions,
    );
    return data;
  }

  static async edit(editSupplyDto: EditSupplyDto): Promise<ISupply> {
    let { id } = editSupplyDto;

    const { data } = await $authHost.put(`entity/supply/${id}`, editSupplyDto);
    return data;
  }

  static async getAll(
    getSuppliesDto: GetSuppliesDto,
  ): Promise<IMoyskladData<ISupply>> {
    let { limit, offset, productHref, search, expand } = getSuppliesDto;
    limit = limit || 1000;
    offset = offset || 0;

    let url = `entity/supply/?limit=${limit}&offset=${offset}&order=created,desc`;
    if (search) {
      url += `&search=${search}`;
    }
    if (productHref) {
      url += `&filter=assortment=${productHref}`;
    }
    if (expand) {
      url += `&expand=${expand}`;
    }

    const { data } = await $authHost.get(url);
    return data;
  }

  static async getOne(supplyId: string): Promise<ISupply> {
    const { data } = await $authHost.get(
      `entity/supply/${supplyId}?expand=agent,store`,
    );
    return data;
  }

  static async getPositions(
    getSupplyPositionsDto: GetSupplyPositionsDto,
  ): Promise<IMoyskladData<IPosition>> {
    let { limit, offset, id, expand, fields } = getSupplyPositionsDto;
    limit = limit || 1000;
    offset = offset || 0;

    let url = `entity/supply/${id}/positions/?limit=${limit}&offset=${offset}`;
    if (expand) {
      url += `&expand=${expand}`;
    }
    if (fields) {
      url += `&fields=${fields}`;
    }

    const { data } = await $authHost.get(url);
    return data;
  }
}
