import { SelectedParam } from 'src/selected-params/selected-params.model';

export interface ICreatedFinishedProduct {
  id: number | null;
  orderId: number;
  quantity: number;
  price: number;
  comment: string;
  selectedParams?: SelectedParam[];
  productId?: number;
  typeId?: number;
}
