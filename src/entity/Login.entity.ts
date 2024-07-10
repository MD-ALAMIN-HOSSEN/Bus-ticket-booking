import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Login {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  passHash: string;

  @Column()
  roleUser: string;
}
