import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { AuthenticatedUser } from '../types/permissions.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET') || '',
    });
  }

  async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
    const user = await this.authService.findByIdWithRolesAndPermissions(
      payload.sub.toString(),
    );

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.usuarioRoles.map((usuarioRol) => ({
        name: usuarioRol.rol.nombre,
        permissions: usuarioRol.rol.permisos.map((rolPermiso) => ({
          name: rolPermiso.permiso.nombre,
        })),
      })),
    };
  }
}
