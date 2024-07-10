import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Admin } from './Admin.entity';
import { Manager } from './Manager.entity';

@Entity()
export class AdminManager {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Admin)
  admin: Admin;

  @ManyToOne(() => Manager)
  manager: Manager;
}
