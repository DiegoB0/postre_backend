import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/request.dto';
import { GetUser } from './decorators/user.decorator';
import { User } from './entities/usuarios.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    // Just to avoid format errors
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post()
  generateApiKey(@GetUser() user: User) {
    return this.authService.createApiKey(user.id);
  }
}
