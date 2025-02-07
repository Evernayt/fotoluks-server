import { $authHost } from '..';
import { IProductFolder } from 'src/moysklad/models/IProductFolder';
import { IMoyskladData } from 'src/moysklad/models/IMoyskladData';
import { GetProductFoldersDto } from './dto/get-product-folders.dto';

export default class ProductFolderAPI {
  static async getAll(
    getProductFoldersDto: GetProductFoldersDto,
  ): Promise<IMoyskladData<IProductFolder>> {
    let { limit, offset, search } = getProductFoldersDto;
    limit = limit || 1000;
    offset = offset || 0;

    let url = `entity/productfolder/?limit=${limit}&offset=${offset}`;
    if (search) {
      url += `&search=${search}`;
    }

    const { data } = await $authHost.get(url);
    return data;
  }
}
