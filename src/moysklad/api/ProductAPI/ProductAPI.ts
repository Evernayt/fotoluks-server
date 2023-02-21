import { IProduct } from 'src/moysklad/models/IProduct';
import { $authHost } from '..';
import { UpdateProductDto } from './dto/update-product.dto';

export default class ProductAPI {
  static async getOne(id: string): Promise<IProduct> {
    const { data } = await $authHost.get(
      `entity/product/${id}/?expand=supplier`,
    );
    return data;
  }

  static async update(updateProductDto: UpdateProductDto): Promise<IProduct> {
    const { id } = updateProductDto;

    const { data } = await $authHost.put(
      `entity/product/${id}`,
      updateProductDto,
    );
    return data;
  }
}
