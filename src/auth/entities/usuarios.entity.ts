import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
