import {ApiProperty} from "@nestjs/swagger";

export class WarehouseDoc {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Warehouse Name' })
    name: string;
}