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
  MethodNotAllowedException,
} from '@nestjs/common';
import { UserClassMemberService } from './user_class_member.service';
import { CreateUserClassMemberDto } from './dto/create-user_class_member.dto';
import { UpdateUserClassMemberDto } from './dto/update-user_class_member.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { ClassService } from '../class/class.service';
import { CustomResponse } from 'src/tools/CustomResponse';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateJoinByClassCodeDto } from './dto/create-join_by_class_code';

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

  @Post('join_class')
  @ApiOperation({ summary: `join class by class_id and create ${TABLE_NAME}` })
  async createJoinClass(
    @Body() createJoinByClassCodeDto: CreateJoinByClassCodeDto,
  ) {
    const findUser = await this.authService.findById(
      createJoinByClassCodeDto.user_id,
    );
    if (!findUser) {
      throw new NotFoundException(
        `user with id ${createJoinByClassCodeDto.user_id} is not found!`,
      );
    }

    const findClass = await this.classService.findByClassCode(
      createJoinByClassCodeDto.class_code,
    );
    if (!findClass) {
      throw new NotFoundException(
        `class with code ${createJoinByClassCodeDto.class_code} is not found!`,
      );
    }

    const findDuplicateUserClass =
      await this.userClassMemberService.findByUserAndClass(
        createJoinByClassCodeDto.user_id,
        findClass.id,
      );
    if (findDuplicateUserClass) {
      throw new MethodNotAllowedException(
        `user ${findUser.name} already join class ${findClass.subject}!`,
      );
    }

    const newUserClassMember = await this.userClassMemberService.create({
      user_id: createJoinByClassCodeDto.user_id,
      is_teacher: createJoinByClassCodeDto.is_teacher,
      class_id: findClass.id,
    });
    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} successfully created!`,
      newUserClassMember,
    );
  }

  @Post()
  @ApiOperation({ summary: `create ${TABLE_NAME}` })
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

    const findDuplicateUserClass =
      await this.userClassMemberService.findByUserAndClass(
        createUserClassMemberDto.user_id,
        createUserClassMemberDto.class_id,
      );
    if (findDuplicateUserClass) {
      throw new MethodNotAllowedException(
        `user ${findUser.name} already join class ${findClass.subject}!`,
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

  @Get('class/:class_id')
  @ApiOperation({ summary: `find ${TABLE_NAME} by class_id` })
  @ApiParam({
    name: 'class_id',
    description: `class_id ${TABLE_NAME}`,
    type: 'string',
    example: 'dont be lazy :)',
  })
  async findManyByClassId(@Param('class_id') class_id: string) {
    // Fetch all class members by class_id
    const findUserClassMember =
      await this.userClassMemberService.findManyByClassId(class_id);

    // Check if there is any admin in the class
    const isAnyAdmin = findUserClassMember.some(
      (member) => member.is_teacher === true,
    );

    // If no admin exists, promote the first user to be an admin
    if (!isAnyAdmin && findUserClassMember.length > 0) {
      const firstUser = findUserClassMember[0];

      firstUser.is_teacher = true;

      await this.userClassMemberService.update(firstUser.id, {
        is_teacher: true,
      });
    }

    // Return the users (class members) with class_id
    return new CustomResponse(
      HttpStatus.OK,
      `Found ${TABLE_NAME} with class_id ${class_id}!`,
      findUserClassMember,
    );
  }

  @Get('user/class/:user_id/:class_id')
  @ApiOperation({ summary: `find ${TABLE_NAME} by user_id and class_id` })
  @ApiParam({
    name: 'class_id',
    description: `class_id ${TABLE_NAME}`,
    type: 'string',
    example: 'dont be lazy :)',
  })
  @ApiParam({
    name: 'user_id',
    description: `user_id ${TABLE_NAME}`,
    type: 'string',
    example: 'dont be lazy :)',
  })
  async findByUserAndClass(
    @Param('user_id') user_id: string,
    @Param('class_id') class_id: string,
  ) {
    const findUserClassMember =
      await this.userClassMemberService.findByUserAndClass(user_id, class_id);
    return new CustomResponse(
      HttpStatus.OK,
      `found ${TABLE_NAME} with user_id ${user_id} and class_id ${class_id}!`,
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

  @Delete('leave/:id')
  @ApiOperation({ summary: `leave class ${TABLE_NAME} by id` })
  @ApiParam({
    name: 'id',
    description: `id ${TABLE_NAME}`,
    type: 'string',
    example: 'dont be lazy :)',
  })
  async leaveClass(@Param('id') id: string) {
    const findUserClassMember = await this.userClassMemberService.findOne(id);
    if (!findUserClassMember) {
      throw new NotFoundException(`${TABLE_NAME} with id ${id} is not found!`);
    }

    // if user_class_member inside current class === 1
    // then delete the class
    const findTotalUserClassMember = await this.classService.findOne(
      findUserClassMember.class_id,
    );
    if (findTotalUserClassMember.user_class_member.length === 1) {
      const deleteClass = await this.classService.remove(
        findUserClassMember.class_id,
      );
      return new CustomResponse(
        HttpStatus.OK,
        `${TABLE_NAME} is successfully deleted!`,
        deleteClass,
      );
    }

    const deleteUserClassMember = await this.userClassMemberService.remove(id);
    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} is successfully deleted!`,
      deleteUserClassMember,
    );
  }
}
