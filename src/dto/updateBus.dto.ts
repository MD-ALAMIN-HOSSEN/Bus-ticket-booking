import { IsString, Length } from 'class-validator';

export class UpdateBusDto {
  @IsString({ message: 'Bus number must be a string' })
  @Length(3, 6, { message: 'Bus number must be between 3 and 6 characters' })
  busNumber: string;
}
