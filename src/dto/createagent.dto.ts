import { CreateInfoDto } from "./createinfo.dto";
import { CreateLoginDto } from "./createlogin.dto";

export class CreateAgentDto {
    info: CreateInfoDto;
    login: CreateLoginDto;
  }