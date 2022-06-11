import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  ID: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  phone: string;
  @Column()
  sex: string;
  @Column()
  birth_day: Date;
  
  constructor(init?: Partial<Customer>) {
    Object.assign(this, init);
  }
}
