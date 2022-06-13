import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FindOneParams } from './Dto/FindeOneParams';
import { SaveUserDto } from './Dto/SaveUserDto';
import { UsersService } from './users.service';

export type UserDataType = {
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
  async getUserDetail(@Param() params: FindOneParams): Promise<User> {
    return await this.usersService.getUserDetail(params.id);
  }

  @Post()
  async save(@Body() userData: SaveUserDto): Promise<{ token: string }> {
    const savedUser = await this.usersService.save(userData);
    const payload = {
      userID: savedUser.id,
    };
    return await this.authService.login(payload);
  }

  @Delete('/:id')
  async delete(@Param() params: FindOneParams) {
    this.usersService.delete(params.id);
  }
}
