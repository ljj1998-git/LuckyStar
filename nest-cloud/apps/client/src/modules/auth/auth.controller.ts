import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('client/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
