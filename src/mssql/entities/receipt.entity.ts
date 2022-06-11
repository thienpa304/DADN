import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { Orders } from './orders.entity'
@Entity()
export class Receipt {
  @PrimaryGeneratedColumn()
  ID: number; 
  @Column()
  total_cost: number;
  @Column()
  id_order: number;
  constructor(init?: Partial<Receipt>) {
    Object.assign(this, init);

  } 
}