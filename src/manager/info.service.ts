import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Info } from '../entity/info.entity'; // Adjust path as per your project structure
import { CreateInfoDto } from './create-info.dto'; // Adjust path as per your project structure

@Injectable()
export class InfoService {
    constructor(
        @InjectRepository(Info)
        private readonly infoRepository: Repository<Info>,
    ) {}

    async createInfo(createInfoDto: CreateInfoDto): Promise<Info> {
        const { name, username, phoneNumber, dateOfBirth, profilePhoto } = createInfoDto;

        const newInfo = new Info();
        newInfo.name = name;
        newInfo.username = username;
        newInfo.phoneNumber = phoneNumber;
        newInfo.dateOfBirth = dateOfBirth;
        newInfo.profilePhoto = profilePhoto;

        return await this.infoRepository.save(newInfo);
    }
}
