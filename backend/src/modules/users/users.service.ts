import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { userDataType } from './users.controller';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async saveUser(userData: userDataType): Promise<{ token: string }> {
    const { lastName, firstName, email } = userData;
    const existUser = await this.usersRepository.findOne({
      email: email,
    });
    if (existUser) {
      this.usersRepository.save({
        ...existUser,
        lastName: lastName,
        firstName: firstName,
      });
    } else {
      this.usersRepository.create(userData);
    }

    const payload = { username: lastName + firstName };
    const token = this.jwtService.sign(payload);
    return { token: token };
  }
}
