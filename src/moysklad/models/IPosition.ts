import { IAssortment } from './IAssortment';
import { IGtd } from './IGtd';

export interface IPosition {
  quantity: number;
  assortment: IAssortment;
  price: number;
  reason?: string;
  gtd?: IGtd;
}
