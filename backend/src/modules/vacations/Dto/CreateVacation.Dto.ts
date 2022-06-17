import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { VacationType } from 'src/entities/Vacation.entity';

export class CreateVacationDto {
  @IsNotEmpty({ message: '日にちは入力必須です。' })
  @IsString({ message: '日にちに入力された値が不正です。' })
  date: string;

  @IsNotEmpty({ message: '休暇の種類は入力必須です。' })
  @IsEnum(VacationType, { message: '種類に入力された値が不正です。' })
  type: VacationType;

  @IsOptional()
  @IsString({ message: '説明に入力された値が不正です。' })
  description: string;
}
