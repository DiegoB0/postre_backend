import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
@Entity('restaurants')
export class Restaurant {
  @CreateDateColumn()
  @UpdateDateColumn()
  // Basic Info ================
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // Foreign Key to Client
  @ManyToOne(() => Client, (client) => client.restaurants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'client_id' }) // Maps the foreign key column
  client: Client;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  operative_hours: string;

  @Column({ default: true })
  isActive: boolean;
  // Address ==============
  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  number: string;

  @Column({ nullable: true })
  zipcode: string;

  @Column({ nullable: true })
  timezone: string;
  // Branding ==============
  @Column({ nullable: true })
  primary_color: string;

  @Column({ nullable: true })
  secondary_color: string;

  @Column({ nullable: true })
  logo: string;
  // Table Layout ==============
}
