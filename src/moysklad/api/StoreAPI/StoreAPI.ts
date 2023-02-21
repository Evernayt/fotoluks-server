import { IMoyskladData } from 'src/moysklad/models/IMoyskladData';
import { IStore } from 'src/moysklad/models/IStore';
import { $authHost } from '..';

export default class StoreAPI {
  static async getAll(): Promise<IMoyskladData<IStore>> {
    const { data } = await $authHost.get('entity/store');
    return data;
  }
}
