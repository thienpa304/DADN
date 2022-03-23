import { SearchDto } from './../dtos'
import { Controller, Get, Param, Query } from '@nestjs/common';  
import { ApiParam, ApiQuery } from '@nestjs/swagger'
import { MesureService } from '../services';

@Controller('/mesures')
export class MesureController {
  constructor(private mesureService: MesureService) {}

  @Get()
  public async getAll() {
    console.log(new Date())
    return this.mesureService.getAll();
  }

  @Get(':key')
  @ApiParam({
    name: 'key',
    schema: {
      example: 'hoductri/feeds/bbc-temp',
    },
  })
  public async getByKey(@Param('key') id: string, @Query() options: SearchDto) { 
    console.log(options)
    return this.mesureService.getByKey(id, options);
  }
}
