import { ProductWarehouseDto } from './productWarehouse.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ example: 'Product Name' })
  name: string;
  @ApiProperty({ example: 100 })
  stock: number;
  @ApiProperty({ required: false, example: ProductWarehouseDto })
  warehouse?: ProductWarehouseDto[];
}
