import { Controller, Post, Request, UseGuards, Get, Body } from '@nestjs/common';
import { ConferencesService } from 'src/conferences/conferences.service';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './create-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private conferenceService: ConferencesService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user._doc);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const transformTime = (data: any) => {
      return this.conferenceService.transformDataWithCertainTime(data);
    }
    const yourConferences = transformTime(req.user.conferences);
    const likedConferences = transformTime(req.user.likedConferences);
    return {
      ...req.user,
      conferences: yourConferences,
      likedConferences
    };
  }

  @Post('register')
  register(@Body() data: CreateAuthDto) {
    return this.authService.register(data);
  }
}
