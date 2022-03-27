import { UsersService } from '../services'
import { AuthService } from '../auth/auth.service';
import { Controller, Post, Request, UseGuards, Query } from '@nestjs/common';
import { LocalAuthGuard } from '../auth';
import { ApiBody } from '@nestjs/swagger'; 
import { UserDto } from '../dtos'


@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiBody({
    schema: {
      example: {
        username: 'john',
        password: 'changeme',
      },
    },
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/sign-up')
  async create(@Query() user: UserDto) {
    return this.usersService.create(user);
  }
}
