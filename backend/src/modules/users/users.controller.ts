import { Body, Controller, Get, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/User.entity';
import { UsersService } from './users.service';

export type userDataType = {
  email: string;
  lastName: string;
  firstName: string;
};
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
  @Post()
  async saveUser(@Body() userData: userDataType): Promise<{ token: string }> {
    return await this.usersService.saveUser(userData);
  }
}
