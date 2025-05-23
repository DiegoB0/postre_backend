import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Rol } from './roles.entity';
import { Permiso } from './permisos.entity';

@Entity('rol_permiso')
export class RolPermiso {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Rol, (rol) => rol.permisos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;

  @ManyToOne(() => Permiso, (permiso) => permiso.roles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'permiso_id' })
  permiso: Permiso;
}
