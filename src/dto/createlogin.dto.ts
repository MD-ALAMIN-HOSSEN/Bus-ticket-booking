import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
export class CreateLoginDto {
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;
    @IsString()
    @IsNotEmpty({ message: 'Password hash is required' })
    passHash: string;
    @IsString()
    @IsNotEmpty({ message: 'Role is required' })
    roleUser: string;
  }