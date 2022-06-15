import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from 'src/entities/User.entity';

export class CreateDepartmentDto {
  @IsString({ message: '部署名には文字列を入力してください。' })
  @IsNotEmpty({ message: '部署名は入力必須です。' })
  name: string;

  @IsArray({ message: 'usersの値は配列で入力してください。' })
  @IsOptional()
  users?: User[];
}
