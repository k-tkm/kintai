import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SaveUserDto {
  @IsEmail({}, { message: 'メールアドレスの形式が正しくありません。' })
  email: string;

  @IsNotEmpty({ message: '姓は必須項目です。' })
  lastName: string;

  @IsNotEmpty({ message: '名は必須項目です。' })
  firstName: string;
}
