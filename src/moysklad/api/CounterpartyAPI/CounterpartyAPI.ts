import { IMoyskladData } from 'src/moysklad/models/IMoyskladData';
import { $authHost } from '..';
import { GetCounterpartyDto } from './dto/get-counterparty.dto';
import { ICounterparty } from 'src/moysklad/models/ICounterparty';

export default class CounterpartyAPI {
  static async getAll(
    getCounterpartyDto?: GetCounterpartyDto,
  ): Promise<IMoyskladData<ICounterparty>> {
    let { limit, offset, id, search } = getCounterpartyDto;
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
