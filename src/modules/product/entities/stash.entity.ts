import {Column, DataType, Model, Table} from "sequelize-typescript";

@Table
export class Stash extends Model {
  @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({unique: true})
  name: string;

  @Column
  stock: number;
}
