import { IsArray, IsOptional, IsString } from 'class-validator';
import { User } from 'src/entities/User.entity';

export class CreateDepartmentDto {
  @IsString({ message: '部署名に入力された値が不正です。' })
  name: string;

  @IsArray({ message: 'usersに入力された値が不正です。' })
  @IsOptional()
  users?: User[];
}
