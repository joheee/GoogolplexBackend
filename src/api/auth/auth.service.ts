import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const loggedUser = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!loggedUser) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    const verifyPass = await bcrypt.compare(password, loggedUser.password);
    if (!verifyPass) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    const payload = {
      id: loggedUser.id,
      email,
      name: loggedUser.name,
      picture: loggedUser.picture,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createAuthDto: CreateAuthDto) {
    const { email, password, name } = createAuthDto;
    const emailCheckUser = await this.prisma.user.findFirst({
      where: { email },
    });
    if (emailCheckUser) {
      throw new BadRequestException(`Email ${email} already used!`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    const payload = {
      id: newUser.id,
      email,
      name: newUser.name,
      picture: newUser.picture,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
