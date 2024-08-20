import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateInfoDto } from "./createinfo.dto";
import { CreateLoginDto } from "./createlogin.dto";

export class CreateAgentDto {
    @ValidateNested()
    @Type(() => CreateInfoDto)
    info: CreateInfoDto;
    @ValidateNested()
    @Type(() => CreateLoginDto)
    login: CreateLoginDto;
  }