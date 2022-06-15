import { IsNumberString } from 'class-validator';

export class UserParamsDto {
  @IsNumberString({}, { message: 'パラメータ値には数値を入力してください。' })
  id: string;
}
