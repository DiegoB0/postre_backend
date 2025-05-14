import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ApiKey {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ unique: true })
  key: string;
}
