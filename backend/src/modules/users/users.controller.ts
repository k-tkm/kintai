import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
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

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getUserDetail(@Param('id') userID: number): Promise<User> {
    return await this.usersService.getUserDetail(userID);
  }

  @Post()
  async saveUser(@Body() userData: userDataType): Promise<{ token: string }> {
    const savedUser = await this.usersService.saveUser(userData);
    const payload = {
      userID: savedUser.id,
    };
    return await this.authService.login(payload);
  }
}
