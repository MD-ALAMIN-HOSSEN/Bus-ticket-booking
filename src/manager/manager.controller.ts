import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { ManagerService } from './manager.service'; // Adjust path as per your project structure
import { CreateManagerDto } from './create-manager.dto'; // Adjust path as per your project structure

@Controller('manager')
export class ManagerController {
    constructor(private readonly managerService: ManagerService) {}

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
