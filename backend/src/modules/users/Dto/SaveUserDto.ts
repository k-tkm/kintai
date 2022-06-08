import { IsEmail, IsNotEmpty } from 'class-validator';

export class SaveUserDto {
  @IsEmail({}, { message: 'メールアドレスの形式が正しくありません。' })
  email: string;

  @IsNotEmpty({ message: '姓は入力必須です。' })
  lastName: string;

  @IsNotEmpty({ message: '名は入力必須です。' })
  firstName: string;
}
