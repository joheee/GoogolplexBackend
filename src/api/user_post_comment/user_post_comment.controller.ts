import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UserPostCommentService } from './user_post_comment.service';
import { CreateUserPostCommentDto } from './dto/create-user_post_comment.dto';
import { UpdateUserPostCommentDto } from './dto/update-user_post_comment.dto';
import { PostService } from '../post/post.service';
import { AuthService } from '../auth/auth.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CustomResponse } from 'src/tools/CustomResponse';

const TABLE_NAME = 'user_post_comment';

@ApiTags(TABLE_NAME)
@Controller(TABLE_NAME)
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class UserPostCommentController {
  constructor(
    private readonly userPostCommentService: UserPostCommentService,
    private readonly authService: AuthService,
    private readonly postService: PostService,
  ) {}

  @Post()
  @ApiOperation({ summary: `create ${TABLE_NAME}` })
  async create(@Body() createUserPostCommentDto: CreateUserPostCommentDto) {
    // USER VALIDATION
    const findUser = await this.authService.findById(
      createUserPostCommentDto.user_id,
    );
    if (!findUser) {
      throw new NotFoundException(
        `user with id ${createUserPostCommentDto.user_id} is not found!`,
      );
    }

    // POST VALIDATION
    const findPost = await this.postService.findOne(
      createUserPostCommentDto.post_id,
    );
    if (!findPost) {
      throw new NotFoundException(
        `post with id ${createUserPostCommentDto.post_id} is not found!`,
      );
    }

    const newUserPostComment = await this.userPostCommentService.create(
      createUserPostCommentDto,
    );
    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} successfully created!`,
      newUserPostComment,
    );
  }

  @Get()
  @ApiOperation({ summary: `get all ${TABLE_NAME}` })
  async findAll() {
    const userPostComment = await this.userPostCommentService.findAll();
    return new CustomResponse(
      HttpStatus.OK,
      `list of ${TABLE_NAME} retrieved successfully!`,
      userPostComment,
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
    const findUserPostComment = await this.userPostCommentService.findOne(id);
    if (!findUserPostComment) {
      throw new NotFoundException(`${TABLE_NAME} with id ${id} is not found!`);
    }
    return new CustomResponse(
      HttpStatus.OK,
      `found ${TABLE_NAME} with id ${findUserPostComment.id}!`,
      findUserPostComment,
    );
  }

  @Get('post/:post_id')
  @ApiOperation({ summary: `find ${TABLE_NAME} by post_id` })
  @ApiParam({
    name: 'post_id',
    description: `post_id ${TABLE_NAME}`,
    type: 'string',
    example: 'dont be lazy :)',
  })
  async findByPostId(@Param('post_id') post_id: string) {
    // POST VALIDATION
    const findPost = await this.postService.findOne(post_id);
    if (!findPost) {
      throw new NotFoundException(`post with id ${post_id} is not found!`);
    }
    const findManyByPostId =
      await this.userPostCommentService.findByPostId(post_id);
    return new CustomResponse(
      HttpStatus.OK,
      `found ${TABLE_NAME} with id length ${findManyByPostId.length}!`,
      findManyByPostId,
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
    @Body() updateUserPostCommentDto: UpdateUserPostCommentDto,
  ) {
    // USER VALIDATION
    if (updateUserPostCommentDto.user_id) {
      const findUser = await this.authService.findById(
        updateUserPostCommentDto.user_id,
      );
      if (!findUser) {
        throw new NotFoundException(
          `user with id ${updateUserPostCommentDto.user_id} is not found!`,
        );
      }
    }

    // POST VALIDATION
    if (updateUserPostCommentDto.post_id) {
      const findPost = await this.postService.findOne(
        updateUserPostCommentDto.post_id,
      );
      if (!findPost) {
        throw new NotFoundException(
          `post with id ${updateUserPostCommentDto.post_id} is not found!`,
        );
      }
    }
    const updateUserPostComment = await this.userPostCommentService.update(
      id,
      updateUserPostCommentDto,
    );
    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} is successfully updated!`,
      updateUserPostComment,
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
    const findUserPostComment = await this.userPostCommentService.findOne(id);
    if (!findUserPostComment) {
      throw new NotFoundException(`${TABLE_NAME} with id ${id} is not found!`);
    }
    const deleteUserPostComment = await this.userPostCommentService.remove(id);
    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} is successfully deleted!`,
      deleteUserPostComment,
    );
  }
}
