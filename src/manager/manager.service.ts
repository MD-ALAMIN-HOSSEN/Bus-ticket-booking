import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from '../entity/manager.entity'; // Adjust path as per your project structure
import { Repository } from 'typeorm';
import { CreateManagerDto } from './create-manager.dto'; // Adjust path as per your project structure
import { Info } from '../entity/info.entity'; // Adjust path as per your project structure
import { Agent } from '../entity/agent.entity';
import { Customer } from 'src/entity';
import { Login } from '../entity/login.entity';
import { CreateAgentDto } from 'src/dto/createagent.dto';

@Injectable()
export class ManagerService {
    constructor(
        @InjectRepository(Manager)
        private readonly managerRepository: Repository<Manager>,
        @InjectRepository(Info)
        private readonly infoRepository: Repository<Info>,
        @InjectRepository(Agent)
        private readonly agentRepository: Repository<Agent>,
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
        @InjectRepository(Login)
        private readonly loginRepository: Repository<Login>,
    ) {}

    async createManager(createManagerDto: CreateManagerDto): Promise<Manager> {
        const { info } = createManagerDto;

        // Create Info entity
        const newInfo = this.infoRepository.create(info);
        await this.infoRepository.save(newInfo);

        // Create Manager entity
        const newManager = this.managerRepository.create({
            info: newInfo,
        });
        return await this.managerRepository.save(newManager);
    }
    
    async findAllAgents(): Promise<Agent[]> {
        return await this.agentRepository.find({
            relations: ['info'],
            //relations: ['info', 'login'],
          });
      }
    async findAllCustomers(): Promise<Customer[]> {
        return await this.customerRepository.find({
            relations: ['info'],
            //relations: ['info', 'login'],
          });
      }
    
      async createAgent(createAgentDto: CreateAgentDto): Promise<Agent> {
        const { info, login } = createAgentDto;
    
        // Create and save Info entity
        const newInfo = this.infoRepository.create(info);
        await this.infoRepository.save(newInfo);
    
        // Create and save Login entity
        const newLogin = this.loginRepository.create(login);
        await this.loginRepository.save(newLogin);
    
        // Create and save Agent entity
        const newAgent = this.agentRepository.create({
          info: newInfo,
          login: newLogin,
        });
        return await this.agentRepository.save(newAgent);
      }

      async deleteAgent(agentId: string): Promise<void> {
        // Find the agent by id and load its relations
        const agent = await this.agentRepository.findOne({
          where: { id: agentId },
          relations: ['info', 'login'],
        });
    
        if (agent) {
          // Delete the Agent record
          await this.agentRepository.remove(agent);
          // Delete the related Info and Login records
          await this.infoRepository.remove(agent.info);
          await this.loginRepository.remove(agent.login);
    
        }
      }
      async updateAgentName(agentId: string, newName: string): Promise<Info> {
        const agent = await this.agentRepository.findOne({
          where: { id: agentId },
          relations: ['info'],
        });
    
        if (!agent) {
          throw new Error('Agent not found');
        }
    
        agent.info.name = newName;
        return await this.infoRepository.save(agent.info);
      }
}
