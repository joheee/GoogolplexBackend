import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { AnswerFileService } from './answer_file.service';
import { CreateAnswerFileDto } from './dto/create-answer_file.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserTodoAnswerService } from '../user_todo_answer/user_todo_answer.service';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { AnswerFileUpload } from './answer_file.upload';
import { CustomResponse } from 'src/tools/CustomResponse';
import { existsSync } from 'fs';

const TABLE_NAME = 'answer_file';

@ApiTags(TABLE_NAME)
@Controller(TABLE_NAME)
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class AnswerFileController {
  constructor(
    private readonly answerFileService: AnswerFileService,
    private readonly userTodoAnswerService: UserTodoAnswerService,
  ) {}
  private readonly publicDir = join(__dirname, '..', '..', '..', 'public');

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: `create ${TABLE_NAME}` })
  @UseInterceptors(
    FileInterceptor('answer_file_upload', {
      storage: AnswerFileUpload.storageOptions,
    }),
  )
  async create(
    @UploadedFile() answer_file_upload: Express.Multer.File,
    @Body() createAnswerFileDto: CreateAnswerFileDto,
  ) {
    // MANDATORY UPLOAD THE FILE
    if (!answer_file_upload) {
      throw new BadRequestException('answer_file_upload is required');
    }
    // VALIDATE USER_TODO_ANSWER EXIST
    const findUserTodoAnswer = await this.userTodoAnswerService.findOne(
      createAnswerFileDto.user_todo_answer_id,
    );
    if (!findUserTodoAnswer) {
      throw new NotFoundException(
        `user_todo_answer with user_todo_answer_id ${createAnswerFileDto.user_todo_answer_id} is not found!`,
      );
    }
    // VALIDATE ASSIGNMENT FILE BASED ON ASSIGNMENT ID EXIST
    const findByUserTodoAnswerId =
      await this.answerFileService.findByUserTodoAnswerId(
        findUserTodoAnswer.id,
      );
    if (findByUserTodoAnswerId) {
      throw new NotFoundException(
        `${TABLE_NAME} with user_todo_answer_id ${findUserTodoAnswer.id} already created! relation only one to one`,
      );
    }
    answer_file_upload.path = join(
      this.publicDir,
      answer_file_upload.path.replace(/^public[\\/]/, ''),
    );
    const answerFile = await this.answerFileService.create(
      findUserTodoAnswer.id,
      answer_file_upload,
    );
    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} with title ${answerFile.originalname} is successfully created!`,
      answerFile,
    );
  }

  @Get()
  @ApiOperation({ summary: `get all ${TABLE_NAME}` })
  async findAll() {
    const answerFile = await this.answerFileService.findAll();
    return new CustomResponse(
      HttpStatus.OK,
      `list of ${TABLE_NAME} retrieved successfully!`,
      answerFile,
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
    const findAnswerFile = await this.answerFileService.findOne(id);
    if (!findAnswerFile) {
      throw new NotFoundException(`${TABLE_NAME} with id ${id} is not found!`);
    }
    return new CustomResponse(
      HttpStatus.OK,
      `found ${TABLE_NAME} with original name ${findAnswerFile.originalname} and server name ${findAnswerFile.filename}!`,
      findAnswerFile,
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
    const findAssignment = await this.answerFileService.findOne(id);
    if (!findAssignment) {
      throw new NotFoundException(`${TABLE_NAME} with id ${id} is not found!`);
    }

    if (!existsSync(findAssignment.path)) {
      throw new NotFoundException(`File ${findAssignment.path} not found`);
    }

    // Remove file and DB entry
    await this.answerFileService.removeInPublic(findAssignment.path);
    const deleteAssignmentFile = await this.answerFileService.removeInDb(id);

    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} is successfully deleted!`,
      deleteAssignmentFile,
    );
  }
}
