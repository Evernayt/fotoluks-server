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

  static async updateMultiple(
    products: UpdateProductDto[],
  ): Promise<IProduct[]> {
    const { data } = await $authHost.post('entity/product', products);
    return data;
  }

  /*
  static async export() {
    const organization = await OrganizationAPI.getAll();
    if (!organization.rows.length) return;

    const { request, data } = await $authHost.post(
      'entity/product/0a5832b5-ca23-11ed-0a80-0bcc0008ee6a/export/',
      {
        organization: {
          meta: organization.rows[0].meta,
        },
        count: 1,
        salePrice: {
          priceType: {
            meta: {
              href: 'https://online.moysklad.ru/api/remap/1.2/context/companysettings/pricetype/cf33ee04-aad8-11e4-90a2-8ecb00126309',
              type: 'pricetype',
              mediaType: 'application/json',
            },
          },
        },
        template: {
          meta: {
            href: 'https://online.moysklad.ru/api/remap/1.2/entity/assortment/metadata/customtemplate/fd85b518-2f75-439d-8a36-dbfce7db3358',
            type: 'customtemplate',
            mediaType: 'application/json',
          },
        },
      },
    );

    return { file: request.res.responseUrl };
  }
  */
}
