import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from 'src/entities/User.entity';

export class CreateDepartmentDto {
  @IsString({ message: '部署名には文字列を使用してください。' })
  @IsNotEmpty({ message: '部署名は必須項目です。' })
  name: string;

  @IsArray({ message: 'usersには配列を使用してください。' })
  @IsOptional()
  users?: User[];
}
