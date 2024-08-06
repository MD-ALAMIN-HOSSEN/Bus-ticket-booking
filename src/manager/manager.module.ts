import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from '../entity/agent.entity';
import { Manager } from '../entity/Manager.entity';
import { Info } from '../entity/info.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Manager,Info, Agent])],
  controllers: [ManagerController],
  providers: [ManagerService]
})
export class ManagerModule {}
