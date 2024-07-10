import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Info {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  phoneNumber: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  profilePhoto: string;
}
