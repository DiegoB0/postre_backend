import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/usuarios.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKey } from './entities/api_keys.entity';
import { JwtStrategy } from './strategy/jwt.strategy';
import { Rol } from './entities/roles.entity';
import { RolPermiso } from './entities/rol_permiso.entity';
import { UsuarioRol } from './entities/usuario_rol.entity';
import { Permiso } from './entities/permisos.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      ApiKey,
      Rol,
      RolPermiso,
      UsuarioRol,
      Permiso,
    ]),
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {
  //Hey
}
