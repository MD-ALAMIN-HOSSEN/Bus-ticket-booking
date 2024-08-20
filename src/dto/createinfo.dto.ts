import { IsString, IsDate, IsOptional, IsNotEmpty } from 'class-validator';
export class CreateInfoDto {
    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;
    @IsString()
    @IsNotEmpty({ message: 'Username is required' })
    username: string;
    @IsString()
    @IsNotEmpty({ message: 'Phone number is required' })
    phoneNumber: string;
    @IsString()
    @IsNotEmpty({ message: 'Date of birth is required' })
    //@IsValidDate({ message: 'Date of birth must be a valid date' })
    dateOfBirth: Date;
    @IsString()
    @IsNotEmpty({ message: 'Profile photo is required' })
    profilePhoto: string;
  }


