import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from '../entity/agent.entity';
import { Manager } from '../entity/Manager.entity';
import { Info } from '../entity/info.entity'; 
import { Customer, Login, Admin } from 'src/entity';


@Module({
  imports: [TypeOrmModule.forFeature([Manager,Login, Agent,Customer,Admin])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
