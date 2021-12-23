import { Controller, Post, Request, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './create-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user._doc);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('register')
  register(@Body() data: CreateAuthDto) {
    return this.authService.register(data);
  }
}
