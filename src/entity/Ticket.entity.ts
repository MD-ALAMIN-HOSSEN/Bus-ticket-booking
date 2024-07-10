import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Bus } from './Bus.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  totalSeatNumber: number;

  @Column()
  bookedSeats: number;

  @Column()
  price: number;

  @Column()
  dateTime: Date;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  busTime: string;

  @ManyToOne(() => Bus)
  bus: Bus;
}
