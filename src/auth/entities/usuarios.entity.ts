import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiKey } from './api_keys.entity';

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  image: string;

  @Column('bool', { default: true })
  isActive: boolean;

  @Column('text', { array: true, nullable: true })
  roles: string[] | null;

  @OneToMany(() => ApiKey, (apiKey) => apiKey.user)
  apiKeys: ApiKey[];
}
