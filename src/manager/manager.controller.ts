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
import { Bus, Customer, Info } from 'src/entity';
import { CreateAgentDto } from 'src/dto/createagent.dto';
import { CreateBusDto } from '../dto/CreateBus.dto';

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

  @Post('createbus')
  async createBus(
    @Body() createBusDto: CreateBusDto, 
    @Session() session: Record<string, any>
  ): Promise<Bus> {
    const managerId = session.userId; // Get the manager ID from the session
    return await this.managerService.createBus(createBusDto, managerId);
  }

  @Put('update-bus-number/:id')
  async updateBusNumber(
    @Param('id') id: string,
    @Body('busNumber') busNumber: string
  ): Promise<Bus> {
    return await this.managerService.updateBusNumber(id, busNumber);
  }

  @Get('buses')
  async getAllBuses(): Promise<Bus[]> {
    return this.managerService.getAllBuses();
  }

  @Put('updateinfo/:id')
  async updateInfo(
    @Param('id') id: string,
    @Body('name') name: string,
    @Session() session: Record<string, any>
  ): Promise<Info>{
    //const infoId =session.user.id;
    const userId = session.userId;  // Accessing the entire user object
    //const infoId = user.id; 
    //console.log("id",userId);
    return this.managerService.updateInfo(name,userId);
  }
}
