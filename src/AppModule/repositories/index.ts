export * from './mesure.repository'
export * from './user.repository'
import { UserRepository } from './user.repository'
import { MesureRepository } from './mesure.repository'
export const AppRepository = [
  MesureRepository,
  UserRepository
]