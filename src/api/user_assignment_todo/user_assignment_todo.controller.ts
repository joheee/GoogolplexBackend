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
import { UserAssignmentTodoService } from './user_assignment_todo.service';
import { CreateUserAssignmentTodoDto } from './dto/create-user_assignment_todo.dto';
import { UpdateUserAssignmentTodoDto } from './dto/update-user_assignment_todo.dto';
import { AuthService } from '../auth/auth.service';
import { AssignmentService } from '../assignment/assignment.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CustomResponse } from 'src/tools/CustomResponse';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

const TABLE_NAME = 'user_assignment_todo';

@ApiTags(TABLE_NAME)
@Controller(TABLE_NAME)
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class UserAssignmentTodoController {
  constructor(
    private readonly userAssignmentTodoService: UserAssignmentTodoService,
    private readonly authService: AuthService,
    private readonly assignmentService: AssignmentService,
  ) {}

  @Post()
  @ApiOperation({ summary: `create ${TABLE_NAME}` })
  async create(
    @Body() createUserAssignmentTodoDto: CreateUserAssignmentTodoDto,
  ) {
    // USER VALIDATION
    const findUser = await this.authService.findById(
      createUserAssignmentTodoDto.user_id,
    );
    if (!findUser) {
      throw new NotFoundException(
        `user with id ${createUserAssignmentTodoDto.user_id} is not found!`,
      );
    }

    // POST VALIDATION
    const findPost = await this.assignmentService.findOne(
      createUserAssignmentTodoDto.assignment_id,
    );
    if (!findPost) {
      throw new NotFoundException(
        `assignment with id ${createUserAssignmentTodoDto.assignment_id} is not found!`,
      );
    }

    const newUserAssignmentTodo = await this.userAssignmentTodoService.create(
      createUserAssignmentTodoDto,
    );
    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} successfully created!`,
      newUserAssignmentTodo,
    );
  }

  @Get()
  @ApiOperation({ summary: `get all ${TABLE_NAME}` })
  async findAll() {
    const userAssignmentTodo = await this.userAssignmentTodoService.findAll();
    return new CustomResponse(
      HttpStatus.OK,
      `list of ${TABLE_NAME} retrieved successfully!`,
      userAssignmentTodo,
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
    const findUserAssignmentTodo =
      await this.userAssignmentTodoService.findOne(id);
    if (!findUserAssignmentTodo) {
      throw new NotFoundException(`${TABLE_NAME} with id ${id} is not found!`);
    }
    return new CustomResponse(
      HttpStatus.OK,
      `found ${TABLE_NAME} with id ${findUserAssignmentTodo.id}!`,
      findUserAssignmentTodo,
    );
  }

  @Get('user/:user_id')
  @ApiOperation({ summary: `find ${TABLE_NAME} by user_id` })
  @ApiParam({
    name: 'user_id',
    description: `user_id ${TABLE_NAME}`,
    type: 'string',
    example: 'dont be lazy :)',
  })
  async findManyByUserId(@Param('user_id') user_id: string) {
    // USER VALIDATION
    const findUser = await this.authService.findById(user_id);
    if (!findUser) {
      throw new NotFoundException(`user with id ${user_id} is not found!`);
    }

    const findManyByUserAndAssignment =
      await this.userAssignmentTodoService.findManyByUserId(user_id);

    return new CustomResponse(
      HttpStatus.OK,
      `found ${TABLE_NAME} with length ${findManyByUserAndAssignment.length}!`,
      findManyByUserAndAssignment,
    );
  }

  @Get('user/assignment/:user_id/:assignment_id')
  @ApiOperation({ summary: `find ${TABLE_NAME} by user_id and assignment_id` })
  @ApiParam({
    name: 'user_id',
    description: `user_id ${TABLE_NAME}`,
    type: 'string',
    example: 'dont be lazy :)',
  })
  @ApiParam({
    name: 'assignment_id',
    description: `assignment_id ${TABLE_NAME}`,
    type: 'string',
    example: 'dont be lazy :)',
  })
  async findManyByUserIdAndAssignmentId(
    @Param('assignment_id') asssignment_id: string,
    @Param('user_id') user_id: string,
  ) {
    const findAssignment = await this.assignmentService.findOne(asssignment_id);
    if (!findAssignment) {
      throw new NotFoundException(
        `${TABLE_NAME} with asssignment_id ${asssignment_id} is not found!`,
      );
    }
    // USER VALIDATION
    const findUser = await this.authService.findById(user_id);
    if (!findUser) {
      throw new NotFoundException(`user with id ${user_id} is not found!`);
    }

    const findManyByUserAndAssignment =
      await this.userAssignmentTodoService.findManyByUserIdAndAssignmentId(
        user_id,
        asssignment_id,
      );

    return new CustomResponse(
      HttpStatus.OK,
      `found ${TABLE_NAME} with length ${findManyByUserAndAssignment.id}!`,
      findManyByUserAndAssignment,
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
    @Body() updateUserAssignmentTodoDto: UpdateUserAssignmentTodoDto,
  ) {
    // USER VALIDATION
    if (updateUserAssignmentTodoDto.user_id) {
      const findUser = await this.authService.findById(
        updateUserAssignmentTodoDto.user_id,
      );
      if (!findUser) {
        throw new NotFoundException(
          `user with id ${updateUserAssignmentTodoDto.user_id} is not found!`,
        );
      }
    }

    // ASSIGNMENT VALIDATION
    if (updateUserAssignmentTodoDto.assignment_id) {
      const findPost = await this.assignmentService.findOne(
        updateUserAssignmentTodoDto.assignment_id,
      );
      if (!findPost) {
        throw new NotFoundException(
          `assignment with id ${updateUserAssignmentTodoDto.assignment_id} is not found!`,
        );
      }
    }
    const updateUserAssignmentTodo =
      await this.userAssignmentTodoService.update(
        id,
        updateUserAssignmentTodoDto,
      );
    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} is successfully updated!`,
      updateUserAssignmentTodo,
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
    const findUserAssignmentTodo =
      await this.userAssignmentTodoService.findOne(id);
    if (!findUserAssignmentTodo) {
      throw new NotFoundException(`${TABLE_NAME} with id ${id} is not found!`);
    }
    const deleteUserAssignmentTodo =
      await this.userAssignmentTodoService.remove(id);
    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} is successfully deleted!`,
      deleteUserAssignmentTodo,
    );
  }
}
