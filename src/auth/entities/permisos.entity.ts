import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RolPermiso } from './rol_permiso.entity';

@Entity('permisos')
export class Permiso {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => RolPermiso, (rp) => rp.permiso)
  roles: RolPermiso[];
}
