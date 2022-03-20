import { ApiProperty } from '@nestjs/swagger';

export class WarehouseProductsDto {
  @ApiProperty({ example: 'Product Name' })
  name: string;
  @ApiProperty({ example: 100 })
  stock: number;
}
