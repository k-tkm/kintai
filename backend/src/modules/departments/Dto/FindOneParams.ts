import { IsNumberString } from 'class-validator';

export class FindOneParams {
  @IsNumberString({}, { message: 'この部署は存在していません。' })
  id: number;
}
