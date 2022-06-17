import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserParamsDto } from './Dto/UserParams.dto';
import { SaveUserDto } from './Dto/SaveUserDto';
import { UsersService } from './users.service';

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
  async getUserDetail(@Param() params: UserParamsDto): Promise<User> {
    return await this.usersService.getUserDetail(Number(params.id));
  }

  @Post()
  async save(@Body() userData: SaveUserDto): Promise<{ token: string }> {
    const savedUser = await this.usersService.save(userData);
    const payload = {
      userID: savedUser.id,
    };
    return await this.authService.generateToken(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param() params: UserParamsDto) {
    await this.usersService.delete(Number(params.id));
  }
}
