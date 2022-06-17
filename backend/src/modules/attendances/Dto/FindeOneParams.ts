import { IsNumberString } from 'class-validator';

export class FindOneParams {
  @IsNumberString({}, { message: 'この勤怠は存在していません。' })
  id: number;
}
