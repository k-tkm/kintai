import { defaultQuery } from './../../utils/defualt';
import { RequestWithUserID } from './../../utils/type';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import { hash } from 'bcrypt';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(
    @Body() newUser: User,
    @Req() req: RequestWithUserID,
  ): Promise<User> {
    const hashedPassword = await hash(newUser.password, 10);
    const createdUser = (await defaultQuery(req.user.company.id))
      .getRepository(User)
      .save({
        ...newUser,
        password: hashedPassword,
        company: req.user.company,
      });
    return createdUser;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: RequestWithUserID) {
    return req.user;
  }
}
