 
import { Injectable } from '@nestjs/common'
import { BaseRepository } from './base.repository'; 
import scheduleSchema, { Schedule } from '../schemas/schedule.schema';

@Injectable()
export class ScheduleRepository extends BaseRepository<Schedule> {
  constructor() {
    super(scheduleSchema);
  }
  
}
