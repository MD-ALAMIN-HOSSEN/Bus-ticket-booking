import { IsString, IsNumber } from 'class-validator';

export class CreateBusDto {
  @IsString({ message: 'Bus number must be a string' })
  busNumber: string;
  @IsNumber({}, { message: 'Total seat must be a number' })
  totalSeat: number;
  @IsString({ message: 'Bus type must be a string' })
  busType: string;
}
