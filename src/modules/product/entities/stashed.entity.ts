import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'stashed_products' })
export class Stashed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false })
  stock: number;

  @Column({nullable: false, unique: true})
  productId: number;
}
