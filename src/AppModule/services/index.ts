export * from './mesures.service';
export * from './users.service';
export * from './schedule.service';
export * from './notification.service';
export * from './orders.service';
export * from './customer.service';
import { UsersService } from './users.service';
import { MesureService } from './mesures.service';
import { ScheduleService } from './schedule.service'
import { NotificationService } from './notification.service';
import { OrderService } from './orders.service';
import { CustomerService } from './customer.service';
export const AppService = [MesureService, UsersService, ScheduleService, NotificationService, OrderService, CustomerService];
