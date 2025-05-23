import { Injectable, UnauthorizedException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto, LoginDto } from './dto/request.dto';
import { User } from './entities/usuarios.entity';
import * as bcrypt from 'bcryptjs';
import { ApiKey } from './entities/api_keys.entity';
import { UsuarioRol } from './entities/usuario_rol.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(ApiKey)
    private apiKeyRepo: Repository<ApiKey>,
    @InjectRepository(UsuarioRol)
    private readonly usuarioRolRepo: Repository<UsuarioRol>,

    private jwtService: JwtService,
  ) {
    //Params for the constructor
  }

  async register(dto: RegisterDto) {
    const { email, name, password, roles = [] } = dto;

    const existingUser = await this.userRepo.findOne({ where: { email } });
    if (existingUser) {
      throw new UnauthorizedException(
        'El correo ya tiene una cuenta registrada',
      );
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Create and save user (exclude roles!)
    const user = this.userRepo.create({
      email,
      name,
      password: hash,
    });

    await this.userRepo.save(user);

    // Insert roles into pivot table
    if (roles.length > 0) {
      const roleLinks = roles.map((rolId) =>
        this.usuarioRolRepo.create({
          usuario: { id: user.id },
          rol: { id: rolId },
        }),
      );

      await this.usuarioRolRepo.save(roleLinks);
    }

    // JWT
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({
      where: { email: dto.email },
      select: ['id', 'email', 'password'],
    });

    if (!user || !dto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createApiKey(incomingUser: User) {
    const user = await this.userRepo.findOne({
      where: { id: incomingUser.id },
    });

    console.log(user);
    console.log('Heyyy');

    if (!user) {
      throw new UnauthorizedException('Unser not found');
    }

    const apiKey = this.apiKeyRepo.create({
      key: uuidv4(),
      revoked: false,
      user,
    });

    return await this.apiKeyRepo.save(apiKey);
  }

  async findByIdWithRolesAndPermissions(userId: string) {
    return await this.userRepo.findOne({
      where: { id: userId },
      relations: [
        'usuarioRoles',
        'usuarioRoles.rol',
        'usuarioRoles.rol.permisos',
        'usuarioRoles.rol.permisos.permiso',
      ],
    });
  }
}
