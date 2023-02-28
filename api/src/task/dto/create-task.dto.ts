import { IsString, IsBoolean, IsNotEmpty, Length } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 256)
  title: string;

  @IsBoolean()
  isChecked: boolean;
}
