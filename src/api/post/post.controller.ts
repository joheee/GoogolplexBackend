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
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ArticleService } from '../article/article.service';
import { ClassService } from '../class/class.service';
import { AssignmentService } from '../assignment/assignment.service';
import { CustomResponse } from 'src/tools/CustomResponse';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

const TABLE_NAME = 'post';

@ApiTags(TABLE_NAME)
@Controller(TABLE_NAME)
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly classService: ClassService,
    private readonly articleService: ArticleService,
    private readonly assignmentService: AssignmentService,
  ) {}

  @Post()
  @ApiOperation({ summary: `create ${TABLE_NAME}` })
  async create(@Body() createPostDto: CreatePostDto) {
    // CLASS VALIDATION
    const findClass = await this.classService.findOne(createPostDto.class_id);
    if (!findClass) {
      throw new NotFoundException(
        `class with id ${createPostDto.class_id} is not found!`,
      );
    }

    // ARTICLE VALIDATION
    if (createPostDto.article_id) {
      const findArticle = await this.articleService.findOne(
        createPostDto.article_id,
      );
      if (!findArticle) {
        throw new NotFoundException(
          `article with id ${createPostDto.article_id} is not found!`,
        );
      }
    }

    // POST VALIDATION
    if (createPostDto.assignment_id) {
      const findAssignment = await this.assignmentService.findOne(
        createPostDto.assignment_id,
      );
      if (!findAssignment) {
        throw new NotFoundException(
          `assignment with id ${createPostDto.assignment_id} is not found!`,
        );
      }
    }

    const newPost = await this.postService.create(createPostDto);
    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} successfully created!`,
      newPost,
    );
  }

  @Get()
  @ApiOperation({ summary: `get all ${TABLE_NAME}` })
  async findAll() {
    const posts = await this.postService.findAll();
    return new CustomResponse(
      HttpStatus.OK,
      `list of ${TABLE_NAME} retrieved successfully!`,
      posts,
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
    const findPost = await this.postService.findOne(id);
    if (!findPost) {
      throw new NotFoundException(`${TABLE_NAME} with id ${id} is not found!`);
    }
    return new CustomResponse(
      HttpStatus.OK,
      `found ${TABLE_NAME} with id ${findPost.id}!`,
      findPost,
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
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    // CLASS VALIDATION
    if (updatePostDto.class_id) {
      const findClass = await this.classService.findOne(updatePostDto.class_id);
      if (!findClass) {
        throw new NotFoundException(
          `class with id ${updatePostDto.class_id} is not found!`,
        );
      }
    }

    // ARTICLE VALIDATION
    if (updatePostDto.article_id) {
      const findArticle = await this.articleService.findOne(
        updatePostDto.article_id,
      );
      if (!findArticle) {
        throw new NotFoundException(
          `article with id ${updatePostDto.article_id} is not found!`,
        );
      }
    }

    // POST VALIDATION
    if (updatePostDto.assignment_id) {
      const findAssignment = await this.assignmentService.findOne(
        updatePostDto.assignment_id,
      );
      if (!findAssignment) {
        throw new NotFoundException(
          `assignment with id ${updatePostDto.assignment_id} is not found!`,
        );
      }
    }
    const updatePost = await this.postService.update(id, updatePostDto);
    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} is successfully updated!`,
      updatePost,
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
    const findPost = await this.postService.findOne(id);
    if (!findPost) {
      throw new NotFoundException(`${TABLE_NAME} with id ${id} is not found!`);
    }
    const deletePost = await this.postService.remove(id);
    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} is successfully deleted!`,
      deletePost,
    );
  }
}
