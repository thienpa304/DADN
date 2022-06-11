
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from '../../mssql/entities/orders.entity';
import { Receipt } from '../../mssql/entities/receipt.entity';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private usersRepository: Repository<Orders>,
    @InjectRepository(Receipt)
    private receiptRepository: Repository<Receipt>,
  ) {}

  findAll(options): Promise<Orders[]> {
    return this.usersRepository.find(options);
  }

  async save(orders: Orders): Promise<Orders> {
    
    return this.usersRepository.save(orders)
  }
 

  async delete(ID: number): Promise<void> {
    await this.receiptRepository.delete(ID)
    await this.usersRepository.delete(ID); 
  }
}
