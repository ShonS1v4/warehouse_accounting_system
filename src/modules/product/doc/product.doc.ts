import {ApiProperty} from "@nestjs/swagger";

export class ProductDoc {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Product name' })
    name: string;

    @ApiProperty({ example: 100 })
    stock: number;

    @ApiProperty({ example: 1 })
    warehouseId: number;
}