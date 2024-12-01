import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { LocalGuard } from './guards/local.guard';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CustomResponse } from 'src/tools/CustomResponse';

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
    return new CustomResponse(
      HttpStatus.OK,
      'user is successfully login!',
      req.user,
    );
  }

  @Patch()
  @ApiOperation({ summary: 'register user' })
  @ApiBody({
    type: CreateAuthDto,
  })
  async customer(@Body() createAuthDto: CreateAuthDto) {
    const { email } = createAuthDto;
    const emailCheckUser = await this.authService.findByEmail(email);

    if (emailCheckUser) {
      throw new BadRequestException(`Email ${email} already used!`);
    }

    const newUser = await this.authService.register(createAuthDto);
    return new CustomResponse(
      HttpStatus.OK,
      `user is successfully created an account!`,
      newUser,
    );
  }

  @Get()
  @ApiOperation({ summary: 'get all users' })
  async findAll() {
    const users = await this.authService.findAll();
    if (users.length === 0) {
      throw new NotFoundException(`user is empty!`);
    }
    return new CustomResponse(
      HttpStatus.OK,
      `list of users retrieved successfully!`,
      users,
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id user',
    type: 'string',
    example: 'dont be lazy :)',
  })
  @ApiOperation({ summary: 'get all users' })
  async findById(@Param('id') id: string) {
    const findUser = await this.authService.findById(id);
    if (!findUser) {
      throw new NotFoundException(`user with id ${id} is not found!`);
    }
    return new CustomResponse(
      HttpStatus.OK,
      `found user with name ${findUser.name}!`,
      findUser,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'update user by id' })
  @ApiParam({
    name: 'id',
    description: 'id user',
    type: 'string',
    example: 'dont be lazy :)',
  })
  async updateById(
    @Param('id') id: string,
    @Body() updateAuthDto: UpdateAuthDto,
  ) {
    const findUser = await this.authService.findById(id);
    if (!findUser) {
      throw new NotFoundException(`user with id ${id} is not found!`);
    }
    const updateUser = await this.authService.updateById(id, updateAuthDto);
    return new CustomResponse(
      HttpStatus.OK,
      `user with name ${findUser.name} successfully updated!`,
      updateUser,
    );
  }
}
