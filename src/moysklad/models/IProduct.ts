import { ISupplier } from './ISupplier';
import { IBarcode } from './IBarcode';
import { IPrice } from './IPrice';
import { IMeta } from './IMeta';

export interface IProduct {
  id: string;
  name: string;
  meta: IMeta;
  variantsCount: number;
  buyPrice: IPrice;
  code?: string;
  article?: string;
  barcodes?: IBarcode[];
  minimumBalance?: number;
  supplier?: ISupplier;
  description?: string;
}
