import { IMoyskladData } from 'src/moysklad/models/IMoyskladData';
import { $authHost } from '..';
import { GetCounterpartiesDto } from './dto/get-counterparties.dto';
import { ICounterparty } from 'src/moysklad/models/ICounterparty';

export default class CounterpartyAPI {
  static async getAll(
    getCounterpartiesDto?: GetCounterpartiesDto,
  ): Promise<IMoyskladData<ICounterparty>> {
    let { limit, offset, id, search } = getCounterpartiesDto;
    limit = limit || 1000;
    offset = offset || 0;

    let url = `entity/counterparty/?limit=${limit}&offset=${offset}`;
    if (id) {
      url += `&filter=id=${id}`;
    }
    if (search) {
      url += `&search=${search}`;
    }

    const { data } = await $authHost.get(url);
    return data;
  }
}
