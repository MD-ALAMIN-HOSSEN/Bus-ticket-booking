import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Agent } from './Agent.entity';
import { Ticket } from './Ticket.entity';
import { Customer } from './Customer.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @OneToOne(() => Agent)
  @JoinColumn()
  agent: Agent;

  @OneToOne(() => Ticket)
  @JoinColumn()
  ticket: Ticket;

  @OneToOne(() => Customer)
  @JoinColumn()
  customer: Customer;
}
