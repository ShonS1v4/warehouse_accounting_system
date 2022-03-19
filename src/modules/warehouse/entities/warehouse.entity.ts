import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Warehouse {
  @ApiProperty({example: 1})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Warehouse Name'})
  @Column()
  name: string;

  @ApiProperty({example: [Product]})
  @OneToMany(() => Product, (product) => product.warehouses, {
    cascade: true,
  })
  products: Product[];
}
