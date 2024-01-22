export interface ICreatedOrderProduct {
  id: number | null;
  orderId: number | null;
  quantity: number;
  price: number;
  comment: string;
  folder: string;
  discount: number | null;
  productId?: number;
}
