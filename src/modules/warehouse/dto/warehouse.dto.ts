import { WarehouseProductsDto } from './warehouseProducts.dto';
import { ApiProperty } from '@nestjs/swagger';

export class WarehouseDto {
  @ApiProperty({ example: 'SuperName' })
  name: string;
  @ApiProperty({ example: WarehouseProductsDto })
  products?: WarehouseProductsDto[];
}
