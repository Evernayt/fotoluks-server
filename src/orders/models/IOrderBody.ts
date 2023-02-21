export interface IOrderBody {
  id: number;
  userId: number | null;
  statusId: number;
  shopId: number;
  sum: number;
  deadline: string;
  comment: string;
  prepayment: number;
}
