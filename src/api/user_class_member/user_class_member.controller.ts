import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserClassMemberService } from './user_class_member.service';
import { CreateUserClassMemberDto } from './dto/create-user_class_member.dto';
import { UpdateUserClassMemberDto } from './dto/update-user_class_member.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { ClassService } from '../class/class.service';
import { CustomResponse } from 'src/tools/CustomResponse';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

const TABLE_NAME = 'user_class_member';

@ApiTags(TABLE_NAME)
@Controller(TABLE_NAME)
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class UserClassMemberController {
  constructor(
    private readonly userClassMemberService: UserClassMemberService,
    private readonly authService: AuthService,
    private readonly classService: ClassService,
  ) {}

  @Post()
  @ApiOperation({ summary: `create ${TABLE_NAME}` })
  @ApiBody({
    type: CreateUserClassMemberDto,
  })
  async create(@Body() createUserClassMemberDto: CreateUserClassMemberDto) {
    const findUser = await this.authService.findById(
      createUserClassMemberDto.user_id,
    );
    if (!findUser) {
      throw new NotFoundException(
        `user with id ${createUserClassMemberDto.user_id} is not found!`,
      );
    }
    const findClass = await this.classService.findOne(
      createUserClassMemberDto.class_id,
    );
    if (!findClass) {
      throw new NotFoundException(
        `class with id ${createUserClassMemberDto.class_id} is not found!`,
      );
    }

    const newUserClassMember = await this.userClassMemberService.create(
      createUserClassMemberDto,
    );
    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} successfully created!`,
      newUserClassMember,
    );
  }

  @Get()
  @ApiOperation({ summary: `get all ${TABLE_NAME}` })
  async findAll() {
    const user_class_member = await this.userClassMemberService.findAll();
    return new CustomResponse(
      HttpStatus.OK,
      `list of ${TABLE_NAME} retrieved successfully!`,
      user_class_member,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: `find ${TABLE_NAME} by id` })
  @ApiParam({
    name: 'id',
    description: `id ${TABLE_NAME}`,
    type: 'string',
    example: 'dont be lazy :)',
  })
  async findOne(@Param('id') id: string) {
    const findUserClassMember = await this.userClassMemberService.findOne(id);
    if (!findUserClassMember) {
      throw new NotFoundException(`${TABLE_NAME} with id ${id} is not found!`);
    }
    return new CustomResponse(
      HttpStatus.OK,
      `found ${TABLE_NAME} with id ${findUserClassMember.id}!`,
      findUserClassMember,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: `update ${TABLE_NAME} by id` })
  @ApiParam({
    name: 'id',
    description: `id ${TABLE_NAME}`,
    type: 'string',
    example: 'dont be lazy :)',
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserClassMemberDto: UpdateUserClassMemberDto,
  ) {
    const findUserClassMember = await this.userClassMemberService.findOne(id);
    if (!findUserClassMember) {
      throw new NotFoundException(`${TABLE_NAME} with id ${id} is not found!`);
    }
    if (updateUserClassMemberDto.user_id) {
      const findUser = await this.authService.findById(
        updateUserClassMemberDto.user_id,
      );
      if (!findUser) {
        throw new NotFoundException(
          `user with id ${updateUserClassMemberDto.user_id} is not found!`,
        );
      }
    }
    if (updateUserClassMemberDto.class_id) {
      const findUser = await this.classService.findOne(
        updateUserClassMemberDto.class_id,
      );
      if (!findUser) {
        throw new NotFoundException(
          `class with id ${updateUserClassMemberDto.class_id} is not found!`,
        );
      }
    }
    const updateNotif = await this.userClassMemberService.update(
      id,
      updateUserClassMemberDto,
    );
    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} is successfully updated!`,
      updateNotif,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: `delete ${TABLE_NAME} by id` })
  @ApiParam({
    name: 'id',
    description: `id ${TABLE_NAME}`,
    type: 'string',
    example: 'dont be lazy :)',
  })
  async remove(@Param('id') id: string) {
    const findUserClassMember = await this.userClassMemberService.findOne(id);
    if (!findUserClassMember) {
      throw new NotFoundException(`${TABLE_NAME} with id ${id} is not found!`);
    }
    const deleteUserClassMember = await this.userClassMemberService.remove(id);
    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} is successfully deleted!`,
      deleteUserClassMember,
    );
  }
}
