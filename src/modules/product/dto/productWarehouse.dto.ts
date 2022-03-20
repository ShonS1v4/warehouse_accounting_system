import { ApiProperty } from '@nestjs/swagger';

export class ProductWarehouseDto {
  @ApiProperty({ example: 1 })
  warehouseId: number;
  @ApiProperty({ example: 100 })
  stock: number;
}
