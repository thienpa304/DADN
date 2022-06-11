import { SearchDto } from './../dtos';
import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { OrderService } from '../services';
import { JwtAuthGuard } from '../auth';
import { ApiParam } from '@nestjs/swagger'
import { Like } from 'typeorm'

@Controller('/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  public async getAll(@Query() options) {
    return this.orderService.findAll({});
  }
  @Post()
  public async save(@Body() order) {
    
    return this.orderService.save(order);
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
    return this.orderService.delete(id);
  }
}
