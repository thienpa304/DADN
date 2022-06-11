export * from './mesure.repository'
export * from './user.repository'
export * from './schedule.repository'
export * from './notification.repository'

import { UserRepository } from './user.repository'
import { MesureRepository } from './mesure.repository'
import { ScheduleRepository } from './schedule.repository'
import { NotificationRepository } from './notification.repository'
export const AppRepository = [
  MesureRepository,
  UserRepository,
  ScheduleRepository,
  NotificationRepository
]