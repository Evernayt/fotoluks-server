export interface IOrderBody {
  id: number;
  userId: number | null;
  statusId: number;
  shopId: number;
  sum: number;
  prepayment: number;
  discount: number;
  deadline: string | null;
  comment: string;
}
