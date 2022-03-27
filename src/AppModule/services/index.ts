export * from './mesures.service';
export * from './users.service';

import { UsersService } from './users.service';
import { MesureService } from './mesures.service';

export const AppService = [MesureService, UsersService];
