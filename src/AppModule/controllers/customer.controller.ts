import { SearchDto } from './../dtos';
import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CustomerService } from '../services';
import { JwtAuthGuard } from '../auth';
import { ApiParam } from '@nestjs/swagger'
import { Like } from 'typeorm'

@Controller('/customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  public async getAll(@Query() options) {
    console.log(options)
    return this.customerService.findAll({});
  }
  @Post()
  public async save(@Body() customer) {
    
    return this.customerService.save(customer);
  }
  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiParam({
    name: 'id',
    schema: {
      example: 1,
    },
  })
  public async remove(@Param('id') id: number) {
    return this.customerService.delete(id);
  }
  @Get('/max-price') 
  public async maxPrice(@Query() options) {
    return this.customerService.findMaxPrice(options.datePicker);
  }
}
