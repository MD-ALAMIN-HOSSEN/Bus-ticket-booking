import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Manager } from './Manager.entity';
import { Agent } from './Agent.entity';

@Entity()
export class ManagerAgent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Manager)
  manager: Manager;

  @ManyToOne(() => Agent)
  agent: Agent;
}
