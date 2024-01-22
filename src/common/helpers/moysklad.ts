import { IDiscount } from 'src/moysklad/models/IDiscount';
import { ISalePrice } from 'src/moysklad/models/ISalePrice';

const getSellingPrice = (salePrices: ISalePrice[]) => {
  return salePrices.find((price) => price.priceType.name === 'Цена продажи');
};

const getAccumulationDiscount = (discounts: IDiscount[]) => {
  return (
    discounts?.find((discount) => discount.accumulationDiscount !== undefined)
      ?.accumulationDiscount || 0
  );
};

export { getSellingPrice, getAccumulationDiscount };
