import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Res,
  Get,
  Delete,
  Param,
  Put,
  Session,
  NotFoundException 
} from '@nestjs/common';
import { ManagerService } from './manager.service'; // Adjust path as per your project structure
import { CreateManagerDto } from './create-manager.dto'; // Adjust path as per your project structure
import { Agent } from '../entity/agent.entity';
import { Customer, Info } from 'src/entity';
import { CreateAgentDto } from 'src/dto/createagent.dto';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Get('agents')
  async getAllAgents(): Promise<Agent[]> {
    return await this.managerService.findAllAgents();
  }

  @Get('customers')
  async getAllCustomers(): Promise<Customer[]> {
    return await this.managerService.findAllCustomers();
  }
  @Post('createagent')
  async createAgent(@Body() createAgentDto: CreateAgentDto, @Session() session: Record<string, any>): Promise<Agent> {
    const managerId = session.userId;
    //console.log("manager id is ",managerId);
    return this.managerService.createAgent(createAgentDto,managerId);
  }

  @Delete('deleteagent/:id')
  async deleteAgent(@Param('id') id: string): Promise<Agent> {
    return this.managerService.deleteAgent(id);
  }
  @Delete('deletecustomer/:id')
  async deleteCustomer(@Param('id') id: string): Promise<Customer> {
    return this.managerService.deleteCustomer(id);
  }
  @Put('updateagentname/:id')
  async updateAgentName(
    @Param('id') id: string,
    @Body('name') name: string
  ): Promise<Info> {
    try{

      return await this.managerService.updateAgentName(id, name);
    }catch (error) {
      if (error.message === 'Customer not found') {
          throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Put('updatecustomer/:id')
  async updateCustomerName(
    @Param('id') id: string,
    @Body('name') name: string
  ): Promise<Info>{
    try {
       return await this.managerService.updateCustomerName(id, name);
     } catch (error) {
      if (error.message === 'Customer not found') {
          throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Post()
  async createManager(@Body() createManagerDto: CreateManagerDto, @Res() res) {
    try {
      const createdManager =
        await this.managerService.createManager(createManagerDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Manager created successfully',
        manager: createdManager,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to create manager',
        error: error.message,
      });
    }
  }
}
