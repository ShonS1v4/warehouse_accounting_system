import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stash {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false })
  stock: number;
}
