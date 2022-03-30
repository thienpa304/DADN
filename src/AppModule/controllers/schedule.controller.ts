import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ScheduleService } from '../services';
import { JwtAuthGuard } from '../auth';
import { ScheduleDto } from './../dtos';
import { ApiParam, ApiQuery } from '@nestjs/swagger';
@Controller('/schedules')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  public async createSchedule(@Body() schedule: ScheduleDto) {
    return this.scheduleService.addSchedule(schedule);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    schema: {
      example: 'hoductri_feeds_bbc-led',
    },
  })
  public async getScheduleById(@Param('id') id: string) {
    return this.scheduleService.findBykey(id.split('_').join('/'));
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    schema: {
      example: '6242e99df9e217c1c73c383d',
    },
  })
  public async remove(@Param('id') id: string) {
    return this.scheduleService.removeBykey(id);
  }
}
