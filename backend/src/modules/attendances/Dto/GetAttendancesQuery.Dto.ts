import { IsNumberString, IsString } from 'class-validator';

export class getAttendancesQueryDto {
  @IsString({ message: '絞り込みをする日付に不正な値が入力されています' })
  startDate: string;

  @IsString({ message: '絞り込みをする日付に不正な値が入力されています' })
  endDate: string;

  @IsNumberString({}, { message: 'このユーザーは存在していません。' })
  user_id: number;
}
