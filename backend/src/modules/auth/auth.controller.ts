import { AuthService } from './auth.service';
import { defaultQuery } from './../../utils/defualt';
import { RequestWithUserID } from './../../utils/type';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(
    @Body() newUser: User,
    @Req() req: RequestWithUserID,
  ): Promise<User> {
    return this.authService.register(newUser, req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: RequestWithUserID) {
    return req.user;
  }
}
