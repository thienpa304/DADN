export * from './mesures.service';
export * from './users.service';
export * from './schedule.service';

import { UsersService } from './users.service';
import { MesureService } from './mesures.service';
import { ScheduleService } from './schedule.service'

export const AppService = [MesureService, UsersService, ScheduleService];
