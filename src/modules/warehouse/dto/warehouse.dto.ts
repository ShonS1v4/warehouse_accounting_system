import {WarehouseProductsDto} from "./warehouseProducts.dto";

export class WarehouseDto {
  name: string;
  products?: WarehouseProductsDto[];
}
