import { IsNumberString } from 'class-validator';

export class ParamsDto {
  @IsNumberString({}, { message: 'パスパラメータには数字を使用してください。' })
  id: string;
}
