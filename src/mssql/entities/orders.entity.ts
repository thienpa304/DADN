import { Receipt } from './receipt.entity'
import { createReadStream } from 'fs'
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  ID: number;
  @Column()
  status: number;
  @Column()
  address_receiver: string;
  @Column()
  phone_receiver: string;
  @Column()
  name_receiver: string;
  @Column()
  m_pro: number;
  @Column()
  v_pro: number;
  @Column()
  distance: number;
  @Column()
  cash: number;
  @Column()
  created_at: string;
   
  constructor(init?: Partial<Orders>) {
    Object.assign(this, init);
  } 
}