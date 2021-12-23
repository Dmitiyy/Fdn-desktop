import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/schemas/user.schema';
import { CreateAuthDto } from './create-auth.dto';

export class UserWithId extends User {
  readonly _id: string;
  constructor() {
    super();
  }
}

type JwtData = {
  _id: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneUser(email);
    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  generateJwtToken({ _id, email }: JwtData): string {
    const payload = { email, sub: _id };
    return this.jwtService.sign(payload);
  }

  async login(user: UserWithId) {
    const payload = { email: user.email, sub: user._id };
    return {
      payload,
      access_token: this.generateJwtToken({ _id: user._id, email: user.email }),
    };
  }

  async register(user: CreateAuthDto) {
    try {
      const hashedPassword: string = await bcrypt.hash(user.password, 12);
      const userWithHashedPassword = { ...user, password: hashedPassword };

      const newUser: any = await this.usersService.createUser(userWithHashedPassword);
      const payload = { email: newUser.email, sub: newUser._id };

      return {
        payload,
        access_token: this.generateJwtToken({ _id: newUser._id, email: newUser.email }),
      };
    } catch (err) {
      throw new ForbiddenException(err);
    }
  }
}
