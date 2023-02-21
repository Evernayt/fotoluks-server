import { IMoyskladData } from 'src/moysklad/models/IMoyskladData';
import { IOrganization } from 'src/moysklad/models/IOrganization';
import { $authHost } from '..';

export default class OrganizationAPI {
  static async getAll(): Promise<IMoyskladData<IOrganization>> {
    const { data } = await $authHost.get('entity/organization');
    return data;
  }
}
