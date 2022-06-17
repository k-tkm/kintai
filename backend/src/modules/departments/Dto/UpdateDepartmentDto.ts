import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from 'src/entities/User.entity';

export class UpdateDepartmentDto {
  @IsString({ message: '部署名に入力された値が不正です。' })
  @IsNotEmpty({ message: '部署名は入力必須です。' })
  @IsOptional()
  name?: string;

  @IsArray({ message: 'usersに入力された値が不正です。' })
  @IsOptional()
  users?: User[];
}
