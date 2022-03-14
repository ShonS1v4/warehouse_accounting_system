import { ProductWarehouseDto } from './productWarehouse.dto';

export class ProductDto {
  name: string;
  stock: number;
  warehouse?: ProductWarehouseDto[];
}
