import { IStock } from './../../models/IStock';
import { IMoyskladData } from 'src/moysklad/models/IMoyskladData';
import { $authHost } from '..';
import { GetStocksDto } from './dto/get-stocks.dto';

export default class StockAPI {
  static async getAll(
    getStocksDto: GetStocksDto,
  ): Promise<IMoyskladData<IStock>> {
    const { type, productHref } = getStocksDto;

    const { data } = await $authHost.get(
      `report/stock/bystore/?filter=${type}=${productHref}&filter=stockMode=all`,
    );
    return data;
  }
}
