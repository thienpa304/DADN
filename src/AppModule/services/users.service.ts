import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserRepository } from '../repositories';
import { User } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async create(user: User): Promise<User | undefined> {
    await this.findOne(user.username).then((user) => { 
      if (user)
        throw new UnauthorizedException(`User ${user.username} already exists`);
    });
    user.created_at = new Date(0);
    return this.userRepository.create(user);
  }
  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ filter: { username } });
  }
}
