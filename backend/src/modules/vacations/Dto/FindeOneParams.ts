import { IsNumberString } from 'class-validator';

export class FindOneParams {
  @IsNumberString({}, { message: 'この休暇情報は存在していません。' })
  id: number;
}
