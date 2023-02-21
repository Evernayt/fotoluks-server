import { IVariant } from 'src/moysklad/models/IVariant';
import { $authHost } from '..';
import { UpdateVariantDto } from './dto/update-variant.dto';

export default class VariantAPI {
  static async getOne(id: string): Promise<IVariant> {
    const { data } = await $authHost.get(
      `entity/variant/${id}/?expand=product`,
    );
    return data;
  }

  static async update(updateVariantDto: UpdateVariantDto): Promise<IVariant> {
    const { id } = updateVariantDto;

    const { data } = await $authHost.put(
      `entity/variant/${id}`,
      updateVariantDto,
    );
    return data;
  }
}
