import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Manager } from './Manager.entity';

@Entity()
export class Bus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  busNumber: string;

  @Column()
  totalSeat: number;

  @Column()
  busType: string;

  @ManyToOne(() => Manager)
  manager: Manager;
}
