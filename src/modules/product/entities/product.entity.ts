import { Warehouse } from '../../warehouse/entities/warehouse.entity';
import {ApiProperty} from "@nestjs/swagger";
import {Column, Model, Table} from "sequelize-typescript";
import {DataType} from 'sequelize-typescript';

@Table
export class Product extends Model{
  @ApiProperty({example: 1})
  @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'Product name'})
  @Column
  name: string;

  @ApiProperty({example: 100})
  @Column
  stock: number;

  @ApiProperty({example: Warehouse})
  warehouses: Warehouse;
}
