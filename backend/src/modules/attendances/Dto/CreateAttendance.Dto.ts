import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AttendanceStatus } from 'src/entities/Attendance.entity';

export class CreateAttendanceDto {
  @IsNotEmpty({ message: '日にちは入力必須です。' })
  @IsString({ message: '日にちに入力された値が不正です。' })
  date: string;

  @IsNotEmpty({ message: '勤怠状況は入力必須です。' })
  @IsEnum(AttendanceStatus, { message: '種類に入力された値が不正です。' })
  status: AttendanceStatus;
}
