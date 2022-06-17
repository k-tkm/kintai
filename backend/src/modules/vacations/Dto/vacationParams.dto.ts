import { IsNumberString } from 'class-validator';

export class VacationParamsDto {
  @IsNumberString({}, { message: 'パスパラメータには数字を使用してください。' })
  id: string;
}
