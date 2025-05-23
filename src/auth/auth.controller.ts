import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/request.dto';
import { GetUser } from './decorators/user.decorator';
import { User } from './entities/usuarios.entity';
import { ApiKeyGuard } from './guards/api-key.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiHeader, ApiSecurity } from '@nestjs/swagger';
import { ApiKeyAuth } from './decorators/auth.decorator';
import { PermissionsGuard } from './guards/permission.guard';
import { CurrentPermissions } from './types/current-permissions';
import { RequirePermissions } from './decorators/permission.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    // Just to avoid format errors
  }

  @Post('createApiKey')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(CurrentPermissions.CreateApiKey)
  @ApiSecurity('jwt')
  generateApiKey(@GetUser() user: User) {
    return this.authService.createApiKey(user);
  }

  @ApiHeader({
    name: 'x-api-key',
    description: 'api-key example: 94ba3b47-c703-4cbd-a87b-408935d98827',
  })
  @Post('login')
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('api-key')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiKeyAuth()
  @Post('register')
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
