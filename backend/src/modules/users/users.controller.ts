import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
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
    private authService: AuthService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }
  @Post()
  async saveUser(@Body() userData: userDataType): Promise<{ token: string }> {
    const savedUser = await this.usersService.saveUser(userData);
    const payload = {
      username: userData.lastName + userData.firstName,
      sub: savedUser.id,
    };
    return await this.authService.login(payload);
  }
}
