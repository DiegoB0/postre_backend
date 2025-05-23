import { DataSource } from 'typeorm';
import { Rol } from 'src/auth/entities/roles.entity';
import { Permiso } from './src/auth/entities/permisos.entity';
import { RolPermiso } from './src/auth/entities/rol_permiso.entity';
import { ValidRoles } from 'src/auth/types/valid-roles';
import { CurrentPermissions } from 'src/auth/types/current-permissions';

// Setup your connection (adjust config as needed)
const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL, // should point to your Supabase DB

  entities: [Rol, Permiso, RolPermiso],
  synchronize: false,

  logging: true,
});

async function seedRolesAndPermissions() {
  await AppDataSource.initialize();

  const roleRepo = AppDataSource.getRepository(Rol);
  const permisoRepo = AppDataSource.getRepository(Permiso);
  const rolPermisoRepo = AppDataSource.getRepository(RolPermiso);

  // Seed Roles
  for (const roleName of Object.values(ValidRoles)) {
    const exists = await roleRepo.findOneBy({ nombre: roleName });
    if (!exists) {
      await roleRepo.save(roleRepo.create({ nombre: roleName }));
    }
  }

  // Seed Permissions
  for (const permisoName of Object.values(CurrentPermissions)) {
    const exists = await permisoRepo.findOneBy({ nombre: permisoName });
    if (!exists) {
      await permisoRepo.save(permisoRepo.create({ nombre: permisoName }));
    }
  }

  // Example: Grant all permissions to postre-admin
  const postreAdmin = await roleRepo.findOneBy({
    nombre: ValidRoles.PostreAdmin,
  });
  const allPermissions = await permisoRepo.find();

  for (const permiso of allPermissions) {
    const exists = await rolPermisoRepo.findOne({
      where: {
        rol: { id: postreAdmin!.id },
        permiso: { id: permiso.id },
      },
      relations: ['rol', 'permiso'],
    });

    if (!exists) {
      await rolPermisoRepo.save(
        rolPermisoRepo.create({
          rol: postreAdmin!,
          permiso,
        }),
      );
    }
  }

  console.log('✅ Roles and permissions seeded.');
  await AppDataSource.destroy();
}

seedRolesAndPermissions().catch((err) => {
  console.error('❌ Error seeding data:', err);
  process.exit(1);
});
