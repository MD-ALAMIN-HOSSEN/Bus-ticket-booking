import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Info } from './Info.entity';
import { Login } from './Login.entity';

@Entity()
export class Manager {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Info)
  @JoinColumn()
  info: Info;

  @OneToOne(() => Login)
  @JoinColumn()
  login: Login;
}
