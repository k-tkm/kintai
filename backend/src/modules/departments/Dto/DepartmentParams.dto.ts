import { IsNumberString } from 'class-validator';

export class DepartmentParamsDto {
  @IsNumberString({}, { message: 'この部署は存在していません。' })
  id: string;
}
