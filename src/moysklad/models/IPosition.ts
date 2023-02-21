import { IAssortment } from './IAssortment';

export interface IPosition {
  quantity: number;
  assortment: IAssortment;
  price: number;
  reason?: string;
}
