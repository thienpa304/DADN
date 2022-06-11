import { SearchDto } from './../dtos';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MesureService } from '../services';
import { JwtAuthGuard } from '../auth';

@Controller('/mesures')
export class MesureController {
  constructor(private mesureService: MesureService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  public async getAll() {
    return this.mesureService.getAll();
  }
  // @UseGuards(JwtAuthGuard)
  @Get('key')
  public async getByKey(@Query() options: SearchDto) {
    return this.mesureService.getByKey(options);
  }
}
