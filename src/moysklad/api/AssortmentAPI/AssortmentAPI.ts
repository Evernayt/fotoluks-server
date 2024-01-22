import { IAssortment } from 'src/moysklad/models/IAssortment';
import { IMoyskladData } from 'src/moysklad/models/IMoyskladData';
import { $authHost } from '..';
import { GetAssortmentsDto } from './dto/get-assortments.dto';

export default class AssortmentAPI {
  static async getAll(
    getAssortmentsDto?: GetAssortmentsDto,
  ): Promise<IMoyskladData<IAssortment>> {
    let { limit, offset, ids, search, stockStore, archived } =
      getAssortmentsDto;
    limit = limit || 1000;
    offset = offset || 0;

    let url = `entity/assortment/?limit=${limit}&offset=${offset}`;
    if (ids) {
      ids.forEach((id) => {
        url += `&filter=id=${id}`;
      });
    }
    if (search) {
      url += `&filter=search=${search}`;
    }
    if (stockStore) {
      url += `&filter=stockStore=${stockStore}`;
    }
    if (archived) {
      url += `&filter=archived=false;archived=true`;
    }

    const { data } = await $authHost.get(url);
    return data;
  }
}
