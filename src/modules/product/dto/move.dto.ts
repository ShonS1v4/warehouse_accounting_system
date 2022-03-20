import { ApiProperty } from '@nestjs/swagger';

export class MoveDto {
  @ApiProperty({ example: 1 })
  warehouseId: number;
  @ApiProperty({ example: 2 })
  to: number;
  @ApiProperty({ example: 10 })
  stock: number;
}
