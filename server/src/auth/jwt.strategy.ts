import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: { sub: string, email: string }) {
    const user: any = await this.usersService.findOneUser(payload.email);

    if (!user) {
      throw new UnauthorizedException("You don't have access to that page")
    }

    const generatedUser = { ...user._doc };
    const { password, ...result }: any = generatedUser;

    return result;
  }
}