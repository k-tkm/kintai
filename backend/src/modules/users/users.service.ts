import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { userDataType } from './users.controller';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getUsers(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['userDepartments', 'userDepartments.department'],
    });
  }

  getUserDetail(userID: number): Promise<User> {
    return this.usersRepository.findOne(userID, {
      relations: ['userDepartments', 'userDepartments.department'],
    });
  }

  async save(userData: userDataType): Promise<User> {
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
      savedUser = await this.usersRepository.save(userData);
    }

    return savedUser;
  }

  async delete(userID: number) {
    this.usersRepository.softDelete(userID);
  }
}
