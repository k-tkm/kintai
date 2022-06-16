import { IsNumberString } from 'class-validator';

export class DepartmentParamsDto {
  @IsNumberString({}, { message: 'パスパラメータには数字を使用してください。' })
  id: string;
}
