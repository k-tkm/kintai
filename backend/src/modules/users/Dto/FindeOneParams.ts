import { IsNumberString } from 'class-validator';

export class FindOneParams {
  @IsNumberString({}, { message: 'このユーザーは存在していません。' })
  id: number;
}
