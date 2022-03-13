import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Warehouse } from '../../warehouse/entities/warehouse.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false })
  stock: number;

  @Column({nullable: false, default: true})
  stashed: boolean;

  @ManyToOne(() => Warehouse, warehouse => warehouse.products)
  warehouses: Warehouse;
}
