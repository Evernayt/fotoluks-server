import { IMoyskladData } from 'src/moysklad/models/IMoyskladData';
import { $authHost } from '..';
import { GetCustomentitiesDto } from './dto/get-customentities.dto';
import { ICustomentity } from 'src/moysklad/models/ICustomentity';

export default class CustomentityAPI {
  static async getAll(
    getCustomentitiesDto?: GetCustomentitiesDto,
  ): Promise<IMoyskladData<ICustomentity>> {
    let { limit, offset, id } = getCustomentitiesDto;
    limit = limit || 1000;
    offset = offset || 0;

    let url = `entity/customentity/${id}/?limit=${limit}&offset=${offset}&order=name,asc`;

    const { data } = await $authHost.get(url);
    return data;
  }
}
