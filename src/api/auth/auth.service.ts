import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from '@prisma/client';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        picture: true,
        created_at: true,
        updated_at: true,
      },
    });
    return users;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });
    return user;
  }

  async findById(id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id },
    });
    return user;
  }

  async updateById(id: string, updateAuthDto: UpdateAuthDto) {
    if (updateAuthDto.password) {
      const hashedPassword = await bcrypt.hash(updateAuthDto.password, 10);
      const user = await this.prisma.user.update({
        where: { id },
        data: { ...updateAuthDto, password: hashedPassword },
      });
      return user;
    }
    const user = await this.prisma.user.update({
      where: { id },
      data: updateAuthDto,
    });
    return user;
  }

  async backgroundHandleLogin(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const loggedUser = await this.findByEmail(email);
    if (!loggedUser) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    const verifyPass = await bcrypt.compare(password, loggedUser.password);
    if (!verifyPass) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    return this.login(loggedUser);
  }
  async login(loggedUser: User) {
    const payload = {
      id: loggedUser.id,
      email: loggedUser.email,
      name: loggedUser.name,
      picture: loggedUser.picture,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createAuthDto: CreateAuthDto) {
    const { email, password, name } = createAuthDto;
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
