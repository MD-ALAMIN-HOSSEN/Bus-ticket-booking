import { Controller, Post, Body, HttpStatus, Res, Get } from '@nestjs/common';
import { ManagerService } from './manager.service'; // Adjust path as per your project structure
import { CreateManagerDto } from './create-manager.dto'; // Adjust path as per your project structure
import { Agent } from '../entity/agent.entity';
import { Customer } from 'src/entity';
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
    async createAgent(@Body() createAgentDto: CreateAgentDto): Promise<Agent> {
        return this.managerService.createAgent(createAgentDto);
      }

    @Post()
    async createManager(@Body() createManagerDto: CreateManagerDto, @Res() res) {
        try {
            const createdManager = await this.managerService.createManager(createManagerDto);
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
