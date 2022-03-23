 
import { Injectable } from '@nestjs/common'
import { BaseRepository } from './base.repository'; 
import userSchema, { User } from '../schemas/user.schema';
@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(userSchema);
  }
}
