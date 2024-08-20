import { IsString, Length } from 'class-validator';

export class UpdateInfoDto {
  @IsString({ message: 'Name must be a string' })
  @Length(2, 50, { message: 'Name must be between 2 and 50 characters' })
  name: string;
}
