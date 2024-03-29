import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { SaveUserDto } from './Dto/SaveUserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private async findUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne(
      {
        email: email,
      },
      { relations: ['company'] },
    );
  }

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: ['userDepartments', 'userDepartments.department'],
    });
  }

  async getUserDetail(userID: number): Promise<User> {
    return await this.usersRepository.findOne(userID, {
      relations: ['userDepartments', 'userDepartments.department', 'company'],
    });
  }

  async save(userData: SaveUserDto): Promise<User> {
    const { lastName, firstName, email } = userData;
    const existUser = await this.findUserByEmail(email);

    if (existUser) {
      const updatedUser = await this.usersRepository.save({
        ...existUser,
        lastName: lastName,
        firstName: firstName,
      });
      return updatedUser;
    }

    const savedUser = await this.usersRepository.save(userData);
    return savedUser;
  }

  async delete(userID: number) {
    await this.usersRepository.softDelete(userID);
  }
}
