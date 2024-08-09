import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Login } from '../entity/login.entity';
import { Manager } from '../entity/Manager.entity';
import { Agent } from '../entity/Agent.entity';
import { Customer } from '../entity/Customer.entity';
import { Admin } from '../entity/Admin.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
    @InjectRepository(Login)
    private loginRepository: Repository<Login>,
    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,

    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,

    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.loginRepository.findOne({ where: { email } });
    if (user && user.passHash === pass) {
      const { passHash, ...result } = user;// destructuring the object to remove password
      return result;
    }
    return null;
  }

  async login(user: any) {
    //console.log("user role",user.roleUser);
    if (user.roleUser === 'manager') {
      const manager = await this.managerRepository.findOne({ where: { login: { id: user.id } } });
      if (manager) {
        user.managerId = manager.id;
      }
    } else if (user.roleUser === 'agent') {
      const agent = await this.agentRepository.findOne({ where: { login: { id: user.id } } });
      if (agent) {
        user.agentId = agent.id;
      }
    } else if (user.roleUser === 'customer') {
      const customer = await this.customerRepository.findOne({ where: { login: { id: user.id } } });
      if (customer) {
        user.customerId = customer.id;
      }
    } else if (user.roleUser === 'admin') {
      const admin = await this.adminRepository.findOne({ where: { login: { id: user.id } } });
      if (admin) {
        user.adminId = admin.id;
      }
    }
    user.userId=user.adminId ||user.customerId ||user.agentId ||user.managerId ;
    return user;
  }
  
}
