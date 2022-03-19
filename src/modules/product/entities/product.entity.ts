import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Warehouse } from '../../warehouse/entities/warehouse.entity';
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Product {
  @ApiProperty({example: 1})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Product name'})
  @Column({ nullable: false, unique: true })
  name: string;

  @ApiProperty({example: 100})
  @Column({ nullable: false })
  stock: number;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.products)
  @JoinTable()
  warehouses: Warehouse;
}
