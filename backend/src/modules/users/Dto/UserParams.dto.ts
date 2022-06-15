import { IsNumberString } from 'class-validator';

export class UserParamsDto {
  @IsNumberString({}, { message: 'このユーザーは存在していません。' })
  id: string;
}
