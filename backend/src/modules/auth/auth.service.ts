import { defaultQuery } from './../../utils/defualt';
import { EmailCompanyMapping } from './../../entities/EmailCompanyMapping';
import { User } from 'src/entities/User.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(EmailCompanyMapping)
    private emailCompanyMappingRepository: Repository<EmailCompanyMapping>,
    private jwtService: JwtService,
  ) {}

  async register(newUser: User, reqUser: User): Promise<User> {
    const hashedPassword = await hash(newUser.password, 10);
    const createdUser = await (await defaultQuery(reqUser.company.id))
      .getRepository(User)
      .save({
        ...newUser,
        password: hashedPassword,
        company: reqUser.company,
      });

    // 認証の際にusersテーブルへのアクセスにもcompanyが必要になるので、
    // ユーザー作成時にemailに基づくcompanyを登録しておく。
    await this.emailCompanyMappingRepository.save({
      email: newUser.email,
      user: createdUser,
      company: reqUser.company,
    });

    return createdUser;
  }

  async generateToken(payload: { userID: number }): Promise<string> {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const foundMappingByEmail =
      await this.emailCompanyMappingRepository.findOne(email, {
        relations: ['company'],
      });
    const foundCompany = foundMappingByEmail.company;

    const user = await (await defaultQuery(foundCompany.id))
      .getRepository(User)
      .findOne({ email }, { select: ['password'] });

    const isAuth = await compare(password, user.password);
    if (!isAuth) {
      return null;
    }

    const token = await this.generateToken({ userID: user.id });

    return { ...user, token };
  }
}
