import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

@Table
export class Product extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  @ApiProperty({ example: 1 })
  id: number;

  @Column
  @ApiProperty({ example: 'Product name' })
  name: string;

  @Column
  @ApiProperty({ example: 100 })
  stock: number;
}
