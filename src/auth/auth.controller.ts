import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }

  @Post('signup')
  async signup(@Body() body) {
    return this.authService.register(body.email, body.fullName, body.password);
  }

  @Post('oauth2')
  async oauth2(@Body() body) {
    return this.authService.oauth2(body.email, body.fullName, body.picture);
  }
}
