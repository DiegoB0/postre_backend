import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/request.dto';
import { GetUser } from './decorators/user.decorator';
import { User } from './entities/usuarios.entity';
import { ApiKeyGuard } from './guards/api-key.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiSecurity } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    // Just to avoid format errors
  }
  @Post('createApiKey')
  generateApiKey(@GetUser() user: User) {
    return this.authService.createApiKey(user.id);
  }

  @Post('login')
  @UseGuards(ApiKeyGuard)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  @UseGuards(ApiKeyGuard, JwtAuthGuard)
  @ApiSecurity('jwt')
  @ApiSecurity('api-key')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
