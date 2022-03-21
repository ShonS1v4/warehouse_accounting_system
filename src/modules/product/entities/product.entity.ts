import { Column, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

@Table
export class Product extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column
  name: string;

  @Column
  stock: number;
}
