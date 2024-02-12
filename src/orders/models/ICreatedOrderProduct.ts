export interface ICreatedOrderProduct {
  id: number | string;
  orderId: number | null;
  quantity: number;
  price: number;
  comment: string;
  folder: string;
  discount: number | null;
  productId?: number;
}
