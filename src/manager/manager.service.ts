import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from '../entity/manager.entity'; // Adjust path as per your project structure
import { Repository } from 'typeorm';
import { CreateManagerDto } from './create-manager.dto'; // Adjust path as per your project structure
import { Info } from '../entity/info.entity'; // Adjust path as per your project structure

@Injectable()
export class ManagerService {
    constructor(
        @InjectRepository(Manager)
        private readonly managerRepository: Repository<Manager>,
        @InjectRepository(Info)
        private readonly infoRepository: Repository<Info>,
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
}
