import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { LocalGuard } from './guards/local.guard';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseGuards(LocalGuard)
  @ApiOperation({ summary: 'login user' })
  @ApiBody({
    type: LoginAuthDto,
  })
  async login(@Req() req: Request) {
    return req.user;
  }

  @Patch()
  @ApiOperation({ summary: 'register user' })
  @ApiBody({
    type: CreateAuthDto,
  })
  customer(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }
}
