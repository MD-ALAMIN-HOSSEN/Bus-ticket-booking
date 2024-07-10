import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { InfoService } from './info.service'; // Adjust path as per your project structure
import { CreateInfoDto } from './create-info.dto'; // Adjust path as per your project structure

@Controller('info')
export class InfoController {
    constructor(private readonly infoService: InfoService) {}

    @Post()
    async createInfo(@Body() createInfoDto: CreateInfoDto, @Res() res) {
        try {
            const createdInfo = await this.infoService.createInfo(createInfoDto);
            return res.status(HttpStatus.CREATED).json({
                message: 'Info created successfully',
                info: createdInfo,
            });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Failed to create info',
                error: error.message,
            });
        }
    }
}
