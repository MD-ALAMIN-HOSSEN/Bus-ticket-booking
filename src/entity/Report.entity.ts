import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from './Customer.entity';
import { Ticket } from './Ticket.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @ManyToOne(() => Customer)
  customer: Customer;

  @ManyToOne(() => Ticket)
  ticket: Ticket;
}
