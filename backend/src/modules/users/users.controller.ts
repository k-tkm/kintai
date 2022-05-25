import { Body, Controller, Get, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/User.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  @Get()
  async getUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }
}
