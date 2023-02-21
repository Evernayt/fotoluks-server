import { IMoyskladData } from 'src/moysklad/models/IMoyskladData';
import { INotification } from 'src/moysklad/models/INotification';
import { $authHost } from '..';
import { GetNotificationsDto } from './dto/get-notifications.dto';

export default class NotificationAPI {
  static async getAll(
    getNotificationsDto: GetNotificationsDto,
  ): Promise<IMoyskladData<INotification>> {
    let { limit, offset } = getNotificationsDto;
    limit = limit || 1000;
    offset = offset || 0;

    const { data } = await $authHost.get(
      `notification/?limit=${limit}&offset=${offset}`,
    );
    return data;
  }
}
