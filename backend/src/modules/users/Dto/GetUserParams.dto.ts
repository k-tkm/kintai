import { IsNumberString } from 'class-validator';

export class GetUserParamsDto {
  @IsNumberString({}, { message: 'このユーザーは存在していません。' })
  id: number;
}
