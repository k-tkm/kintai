import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { userDataType } from './users.controller';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async saveUser(userData: userDataType): Promise<User> {
    const { lastName, firstName, email } = userData;
    const existUser = await this.usersRepository.findOne({
      email: email,
    });
    let savedUser: User;
    if (existUser) {
      savedUser = await this.usersRepository.save({
        ...existUser,
        lastName: lastName,
        firstName: firstName,
      });
    } else {
      savedUser = this.usersRepository.create(userData);
    }

    return savedUser;
  }
}
