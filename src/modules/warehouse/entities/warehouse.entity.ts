import { Product } from '../../product/entities/product.entity';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

@Table
export class Warehouse extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column
  name: string;

  @HasMany(() => Product, 'warehouseId')
  products: Product[];
}
