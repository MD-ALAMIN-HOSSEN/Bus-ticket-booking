import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Info } from '../entity/info.entity'; // Adjust path as per your project structure
import { InfoController } from './info.controller'; // Adjust path as per your project structure
import { InfoService } from './info.service'; // Adjust path as per your project structure

@Module({
    imports: [
        TypeOrmModule.forFeature([Info]), // Register Info entity with TypeORM
    ],
    controllers: [InfoController],
    providers: [InfoService],
    exports: [InfoService], // Optionally export InfoService for dependency injection
})
export class InfoModule {}
