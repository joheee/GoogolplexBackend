import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { UserTodoAnswerService } from './user_todo_answer.service';
import { CreateUserTodoAnswerDto } from './dto/create-user_todo_answer.dto';
import { UpdateUserTodoAnswerDto } from './dto/update-user_todo_answer.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserAssignmentTodoService } from '../user_assignment_todo/user_assignment_todo.service';
import { CustomResponse } from 'src/tools/CustomResponse';

const TABLE_NAME = 'user_todo_answer';

@ApiTags(TABLE_NAME)
@Controller(TABLE_NAME)
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class UserTodoAnswerController {
  constructor(
    private readonly userTodoAnswerService: UserTodoAnswerService,
    private readonly userAssignmentTodoService: UserAssignmentTodoService,
  ) {}

  @Post()
  @ApiOperation({ summary: `create ${TABLE_NAME}` })
  async create(@Body() createUserTodoAnswerDto: CreateUserTodoAnswerDto) {
    // POST VALIDATION
    const findPost = await this.userAssignmentTodoService.findOne(
      createUserTodoAnswerDto.user_assignment_todo_id,
    );
    if (!findPost) {
      throw new NotFoundException(
        `user_assignment_todo with id ${createUserTodoAnswerDto.user_assignment_todo_id} is not found!`,
      );
    }

    // POST USER_TODO_ANSWER BY USER_ASSIGNMENT_TODO_ID
    const findByUserAssignmentTodoId =
      await this.userTodoAnswerService.findByUserAssignmentTodoId(
        createUserTodoAnswerDto.user_assignment_todo_id,
      );
    if (findByUserAssignmentTodoId) {
      throw new NotFoundException(
        `user_todo_answer with user_assignment_todo_id ${createUserTodoAnswerDto.user_assignment_todo_id} is already created!`,
      );
    }

    // UPDATE USER_ASSIGNMENT_TODO IS_FINISH TRUE
    await this.userAssignmentTodoService.update(
      createUserTodoAnswerDto.user_assignment_todo_id,
      {
        is_finish: true,
      },
    );

    const newUserTodoAnswer = await this.userTodoAnswerService.create(
      createUserTodoAnswerDto,
    );
    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} successfully created!`,
      newUserTodoAnswer,
    );
  }

  @Get()
  @ApiOperation({ summary: `get all ${TABLE_NAME}` })
  async findAll() {
    const userTodoAnswer = await this.userTodoAnswerService.findAll();
    return new CustomResponse(
      HttpStatus.OK,
      `list of ${TABLE_NAME} retrieved successfully!`,
      userTodoAnswer,
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
    const findUserTodoAnswer = await this.userTodoAnswerService.findOne(id);
    if (!findUserTodoAnswer) {
      throw new NotFoundException(`${TABLE_NAME} with id ${id} is not found!`);
    }
    return new CustomResponse(
      HttpStatus.OK,
      `found ${TABLE_NAME} with id ${findUserTodoAnswer.id}!`,
      findUserTodoAnswer,
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
    @Body() updateUserTodoAnswerDto: UpdateUserTodoAnswerDto,
  ) {
    // USER_ASSIGNMENT_TODO VALIDATION
    if (updateUserTodoAnswerDto.user_assignment_todo_id) {
      const findPost = await this.userAssignmentTodoService.findOne(
        updateUserTodoAnswerDto.user_assignment_todo_id,
      );
      if (!findPost) {
        throw new NotFoundException(
          `user_assignment_todo with id ${updateUserTodoAnswerDto.user_assignment_todo_id} is not found!`,
        );
      }
    }
    const updateUserTodoAnswer = await this.userTodoAnswerService.update(
      id,
      updateUserTodoAnswerDto,
    );
    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} is successfully updated!`,
      updateUserTodoAnswer,
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
    const findUserTodoAnswer = await this.userTodoAnswerService.findOne(id);
    if (!findUserTodoAnswer) {
      throw new NotFoundException(`${TABLE_NAME} with id ${id} is not found!`);
    }
    const deleteUserTodoAnswer = await this.userTodoAnswerService.remove(id);
    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} is successfully deleted!`,
      deleteUserTodoAnswer,
    );
  }
}
