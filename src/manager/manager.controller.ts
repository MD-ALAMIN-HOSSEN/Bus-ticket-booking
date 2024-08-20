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
  NotFoundException, 
  UseGuards,
  ValidationPipe,
  UsePipes
} from '@nestjs/common';
import { ManagerService } from './manager.service'; // Adjust path as per your project structure
//import { CreateManagerDto } from './create-manager.dto'; // Adjust path as per your project structure
import { Agent } from '../entity/agent.entity';
import { Bus, Customer, Info } from 'src/entity';
import { CreateAgentDto } from 'src/dto/createagent.dto';
import { UpdatePasswordDto } from 'src/dto/updatePassword.dto';
import { CreateBusDto } from '../dto/CreateBus.dto';
import { Ticket } from '../entity/ticket.entity';
import { ManagerGuard } from '../guard manager/manager.guard';
import { UpdateInfoDto } from '../dto/updateInfo.dto';
import { UpdateBusDto } from 'src/dto/updateBus.dto';
import { UpdateCustomerDto } from 'src/dto/updateCustomer.dto';
import { UpdateAgentDto } from 'src/dto/updateAgent.dto';

@Controller('manager')
@UseGuards(ManagerGuard)// Apply the guard at the controller level
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
  @UsePipes(new ValidationPipe())
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
  @UsePipes(new ValidationPipe())
  async updateAgentName(
    @Param('id') id: string,
    @Body() updateAgentDto: UpdateAgentDto
    //@Body('name') name: string
  ): Promise<Info> {
    try{
      const name=updateAgentDto.name;
      return await this.managerService.updateAgentName(id, name);
    }catch (error) {
      if (error.message === 'Customer not found') {
          throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  //customer needs to be there
  @Put('updatecustomer/:id')
  @UsePipes(new ValidationPipe())
  async updateCustomerName(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ): Promise<Info>{
    try {
      const name= updateCustomerDto.name;
       return await this.managerService.updateCustomerName(id, name);
     } catch (error) {
      if (error.message === 'Customer not found') {
          throw new NotFoundException(error.message);
      }
      throw error;
    }
  }



  @Post('createbus')
  @UsePipes(new ValidationPipe())
  async createBus(
    @Body() createBusDto: CreateBusDto, 
    @Session() session: Record<string, any>
  ): Promise<Bus> {
    const managerId = session.userId; // Get the manager ID from the session
    return await this.managerService.createBus(createBusDto, managerId);
  }

  @Put('update-bus-number/:id')
  @UsePipes(new ValidationPipe())
  async updateBusNumber(
    @Param('id') id: string,
    @Body() updateBusNumberDto: UpdateBusDto  
  ): Promise<Bus> {
    const busNumber=updateBusNumberDto.busNumber;
    //console.log(busNumber);
    return await this.managerService.updateBusNumber(id, busNumber);
  }

  @Get('buses')
  async getAllBuses(): Promise<Bus[]> {
    return this.managerService.getAllBuses();
  }

  @Put('updateinfo/:id')
  @UsePipes(new ValidationPipe())
  async updateInfo(
    @Param('id') id: string,
    @Body() updateInfoDto: UpdateInfoDto,
    @Session() session: Record<string, any>
  ): Promise<Info>{
    //const infoId =session.user.id;
    const userId = session.userId;  // Accessing the entire user object
    const name = updateInfoDto.name; 
    //console.log("id",userId);
    return this.managerService.updateInfo(name,userId);
  }
  @Put('updatepass/:id')
  @UsePipes(new ValidationPipe())
  async updatePass(
    @Param('id') id: string,
    @Body() UpdatePasswordDto: UpdatePasswordDto,
    @Session() session: Record<string, any>
  ): Promise<any>{
    //const infoId =session.user.id;
    const userId = session.userId;  // Accessing the entire user object
    const pass = UpdatePasswordDto.pass; 
    //console.log("id",userId);
     const new2 = await this.managerService.updatePass(pass,userId);
     return { message: 'Password change successful'};
  }

  @Get('tickets')
  async getAllTickets(): Promise<Ticket[]> {
    return this.managerService.getAllTickets();
  }
}
