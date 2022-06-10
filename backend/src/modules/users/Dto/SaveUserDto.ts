import { IsEmail, IsNotEmpty } from 'class-validator';

export class SaveUserDto {
  @IsEmail({}, { message: 'メールアドレスの形式が正しくありません。' })
  email: string;

  @IsNotEmpty({ message: '姓の入力が空です。' })
  lastName: string;

  @IsNotEmpty({ message: '名の入力が空です。' })
  firstName: string;
}
