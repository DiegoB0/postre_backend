import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
@Entity('clients')
export class Client {
  @CreateDateColumn()
  @UpdateDateColumn()
  createdAt: Date;
  // Basic Info ================
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  subscription_plan: string;

  // One-to-Many relationship with Restaurant
  @OneToMany(() => Restaurant, (restaurant) => restaurant.client)
  restaurants: Restaurant[];
}
