import { IsNumberString } from 'class-validator';

export class UserParamsDto {
  @IsNumberString({}, { message: 'パスパラメータには数字を使用してください。' })
  id: string;
}
