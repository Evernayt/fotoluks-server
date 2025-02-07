import { IStock } from './../../models/IStock';
import { IMoyskladData } from 'src/moysklad/models/IMoyskladData';
import { $authHost } from '..';
import { GetStocksDto } from './dto/get-stocks.dto';
import { GetStocksByOperationDto } from './dto/get-stocks-by-operation.dto';

export default class StockAPI {
  static async getAll(
    getStocksDto: GetStocksDto,
  ): Promise<IMoyskladData<IStock>> {
    let { limit, offset, search, type, productHref } = getStocksDto;
    limit = limit || 1000;
    offset = offset || 0;

    let url = `report/stock/bystore/?limit=${limit}&offset=${offset}&filter=stockMode=all`;
    if (search) {
      url += `&filter=search=${search}`;
    }
    if (type && productHref) {
      url += `&filter=${type}=${productHref}`;
    }

    const { data } = await $authHost.get(url);
    return data;
  }

  static async getAllByOperation(
    getStocksByOperationDto: GetStocksByOperationDto,
  ): Promise<IMoyskladData<IStock>> {
    let { limit, offset, id } = getStocksByOperationDto;
    limit = limit || 1000;
    offset = offset || 0;

    let url = `report/stock/byoperation/?operation.id=${id}&limit=${limit}&offset=${offset}`;

    const { data } = await $authHost.get(url);
    return data;
  }
}
