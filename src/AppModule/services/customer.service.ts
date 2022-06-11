import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from '../../mssql/entities/orders.entity'
import { Repository } from 'typeorm';
import { Customer } from '../../mssql/entities/customer.entity';
import { Receipt } from '../../mssql/entities/receipt.entity';
@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Receipt)
    private receiptRepository: Repository<Receipt>,
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
  ) {}

  findAll(options): Promise<Customer[]> {
    return this.customerRepository.find(options);
  }

  async save(customer: Customer): Promise<Customer> {
    return this.customerRepository.save(customer);
  }

  async delete(ID: number): Promise<void> {
    await this.customerRepository.delete(ID);
  }
  async findMaxPrice(datePicker): Promise<Customer[]> {
    let ordersInDate = await this.ordersRepository.query(`
    select customer.ID, sum(total_cost) as total from customer join orders ON customer.ID = orders.id_account join receipt on receipt.id_order = orders.ID where orders.created_at = '${datePicker}'  group by customer.ID `)
 
    return ordersInDate
  }
  
}
