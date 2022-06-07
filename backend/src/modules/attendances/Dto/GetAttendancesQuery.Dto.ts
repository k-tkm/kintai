import { IsEmpty, IsNumberString, IsString } from 'class-validator';

export class getAttendancesQueryDto {
  @IsEmpty({ message: '絞り込みをする日付は入力必須です。' })
  @IsString({ message: '絞り込みをする日付に不正な値が入力されています' })
  startDate: string;

  @IsEmpty({ message: '絞り込みをする日付は入力必須です。' })
  @IsString({ message: '絞り込みをする日付に不正な値が入力されています' })
  endDate: string;

  @IsNumberString({}, { message: 'このユーザーは存在していません。' })
  user_id: number;
}
