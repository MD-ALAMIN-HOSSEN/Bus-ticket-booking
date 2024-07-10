import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Customer } from './Customer.entity';
import { Agent } from './Agent.entity';

@Entity()
export class CustomerAgent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer)
  customer: Customer;

  @ManyToOne(() => Agent)
  agent: Agent;
}
