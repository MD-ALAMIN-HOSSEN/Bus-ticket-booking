import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from '../entity/manager.entity'; // Adjust path as per your project structure
import { Repository } from 'typeorm';
//import { CreateManagerDto } from './create-manager.dto'; // Adjust path as per your project structure
import { Info } from '../entity/info.entity'; // Adjust path as per your project structure
import { Agent } from '../entity/agent.entity';
import { Bus, Customer, ManagerAgent, Ticket } from 'src/entity';
import { Login } from '../entity/login.entity';
import { CreateAgentDto } from 'src/dto/createagent.dto';
import { CreateBusDto } from '../dto/CreateBus.dto';

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
        @InjectRepository(ManagerAgent)
        private managerAgentRepository: Repository<ManagerAgent>,
        @InjectRepository(Bus)
        private readonly busRepository: Repository<Bus>,
        @InjectRepository(Ticket)
        private readonly ticketRepository: Repository<Ticket>
    ) {}



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
    
      async createAgent(createAgentDto: CreateAgentDto,managerId: string): Promise<Agent> {
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
        const newAgentSave= await this.agentRepository.save(newAgent);
        this.assignAgentToManager(managerId, newAgentSave.id);
        return newAgentSave;
      }

      async assignAgentToManager(managerId: string, agentId: string): Promise<ManagerAgent> {
        const manager = await this.managerRepository.findOne({
          where: { id: managerId },
        });
        const agent = await this.agentRepository.findOne({
          where: { id: agentId },
        });
    
        if (!manager || !agent) {
          throw new Error('Manager or Agent not found');
        }
    
        const managerAgent = new ManagerAgent();
        managerAgent.manager = manager;
        managerAgent.agent = agent;
    
        return await this.managerAgentRepository.save(managerAgent);
      }

      async deleteAgent(agentId: string): Promise<Agent> {
        // Find the agent by id and load its relations
        const agent = await this.agentRepository.findOne({
          where: { id: agentId },
          relations: ['info', 'login'],
        });
        const manageragent = await this.managerAgentRepository.findOne({
          where: { agent: { id: agentId } },
          relations: ['manager', 'agent'],
        });
        if (agent) {
          if (manageragent) {
            await this.managerAgentRepository.remove(manageragent);
          } else {
            throw new Error('ManagerAgent record not found for the given agentId');
          }
          // Delete the Agent record
          await this.agentRepository.remove(agent);
          // Delete the related Info and Login records
          await this.infoRepository.remove(agent.info);
          await this.loginRepository.remove(agent.login);
          //await this.managerAgentRepository.remove(manageragent);
        }
        return agent;
      }
      async deleteCustomer(customerId: string): Promise<Customer> {
        // Find the agent by id and load its relations
        const customer = await this.customerRepository.findOne({
          where: { id: customerId },
          relations: ['info', 'login'],
        });
    
        if (customer) {
          // Delete the Agent record
          await this.customerRepository.remove(customer);
          // Delete the related Info and Login records
          await this.infoRepository.remove(customer.info);
          await this.loginRepository.remove(customer.login);
    
        }
        return customer;
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

      async updateCustomerName(customerId: string, newName: string): Promise<Info> {
        const customer = await this.customerRepository.findOne({
          where: { id: customerId },
          relations: ['info'],
        });
    
        if (!customer) {
          throw new Error('Customer not found');
        }
    
        customer.info.name = newName;
        return await this.infoRepository.save(customer.info);
      }

      async createBus(createBusDto: CreateBusDto, managerId: string): Promise<Bus> {
        const manager = await this.managerRepository.findOne({ where: { id: managerId } });
        if (!manager) {
          throw new Error('Manager not found');
        }
    
        const newBus = this.busRepository.create({
          ...createBusDto,
          manager: manager,
        });
    
        return await this.busRepository.save(newBus);
      }
      async updateBusNumber(id: string, newBusNumber: string): Promise<Bus> {
        const bus = await this.busRepository.findOne({
          where: { id }, // Find by primary key
        });
        if (!bus) {
          throw new NotFoundException('Bus not found');
        }
    
        bus.busNumber = newBusNumber;
        return await this.busRepository.save(bus);
      }

      async getAllBuses(): Promise<Bus[]> {
        return await this.busRepository.find({
          relations: ['manager'], // Include related manager details if needed
        });
      }

      async updateInfo(name: string, managerId: string): Promise<Info> {
        const manager = await this.managerRepository.findOne({
          where: { id: managerId },
          relations: ['info', 'login'],
        });
        //console.log('Session:', name);
        const infoId =manager.info.id;
        const info= await this.infoRepository.findOne({
          where: {id: infoId},
        });
        if (!info) {
          throw new NotFoundException('Info not found');
        }

        info.name = name;

        return await this.infoRepository.save(info);
      }

      async updatePass(pass: string, managerId: string): Promise<Login> {
        const manager = await this.managerRepository.findOne({
          where: { id: managerId },
          relations: ['info', 'login'],
        });
        //console.log('Session:', manager);
        const loginId =manager.login.id;
        const login= await this.loginRepository.findOne({
          where: {id: loginId},
        });
        if (!login) {
          throw new NotFoundException('login not found');
        }

        login.passHash = pass;

        return await this.loginRepository.save(login);
      }

      async getAllTickets(): Promise<Ticket[]> {
        try {
          const tickets = await this.ticketRepository.find({
            relations: ['bus', 'agent'],
          });
    
          if (!tickets || tickets.length === 0) {
            throw new NotFoundException('No tickets found');
          }
    
          return tickets;

        } catch (error) {
          throw new InternalServerErrorException('Failed to retrieve tickets', error.message);
        }
      }
}
