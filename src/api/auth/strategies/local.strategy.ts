import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    console.log(`trigger local strategy : ${email}`);
    const user = await this.authService.backgroundHandleLogin({
      email,
      password,
    });
    if (!user) throw new UnauthorizedException('invalid credentials!');
    return user;
  }
}
