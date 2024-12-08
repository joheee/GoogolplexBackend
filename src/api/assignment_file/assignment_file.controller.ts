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
import { AssignmentFileService } from './assignment_file.service';
import { CreateAssignmentFileDto } from './dto/create-assignment_file.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { AssignmentFileUpload } from './assignment_file.upload';
import { AssignmentService } from '../assignment/assignment.service';
import { CustomResponse } from 'src/tools/CustomResponse';
import { join } from 'path';
import { existsSync } from 'fs';

const TABLE_NAME = 'assignment_file';

@ApiTags(TABLE_NAME)
@Controller(TABLE_NAME)
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class AssignmentFileController {
  constructor(
    private readonly assignmentFileService: AssignmentFileService,
    private readonly assignmentService: AssignmentService,
  ) {}

  private readonly publicDir = join(__dirname, '..', '..', '..', 'public');

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: `create ${TABLE_NAME}` })
  @UseInterceptors(
    FileInterceptor('assignment_file_upload', {
      storage: AssignmentFileUpload.storageOptions,
    }),
  )
  async create(
    @UploadedFile() assignment_file_upload: Express.Multer.File,
    @Body() createAssignmentFileDto: CreateAssignmentFileDto,
  ) {
    // MANDATORY UPLOAD THE FILE
    if (!assignment_file_upload) {
      throw new BadRequestException('assignment_file_upload is required');
    }
    // VALIDATE ASSIGNMENT EXIST
    const findAssignment = await this.assignmentService.findOne(
      createAssignmentFileDto.assignment_id,
    );
    if (!findAssignment) {
      throw new NotFoundException(
        `${TABLE_NAME} with id ${createAssignmentFileDto.assignment_id} is not found!`,
      );
    }
    // VALIDATE ASSIGNMENT FILE BASED ON ASSIGNMENT ID EXIST
    const findByAssignmentId =
      await this.assignmentFileService.findByAssignmentId(findAssignment.id);
    if (findByAssignmentId) {
      throw new NotFoundException(
        `${TABLE_NAME} with assignment_id ${createAssignmentFileDto.assignment_id} already created! relation only one to one`,
      );
    }
    assignment_file_upload.path = join(
      this.publicDir,
      assignment_file_upload.path.replace(/^public[\\/]/, ''),
    );
    const assignmentFile = await this.assignmentFileService.create(
      findAssignment.id,
      assignment_file_upload,
    );
    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} with title ${assignmentFile.originalname} is successfully created!`,
      assignmentFile,
    );
  }

  @Get()
  @ApiOperation({ summary: `get all ${TABLE_NAME}` })
  async findAll() {
    const assignmentFile = await this.assignmentFileService.findAll();
    return new CustomResponse(
      HttpStatus.OK,
      `list of ${TABLE_NAME} retrieved successfully!`,
      assignmentFile,
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
    const findAssignment = await this.assignmentFileService.findOne(id);
    if (!findAssignment) {
      throw new NotFoundException(`${TABLE_NAME} with id ${id} is not found!`);
    }
    return new CustomResponse(
      HttpStatus.OK,
      `found ${TABLE_NAME} with original name ${findAssignment.originalname} and server name ${findAssignment.filename}!`,
      findAssignment,
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
    const findAssignment = await this.assignmentFileService.findOne(id);
    if (!findAssignment) {
      throw new NotFoundException(`${TABLE_NAME} with id ${id} is not found!`);
    }

    if (!existsSync(findAssignment.path)) {
      throw new NotFoundException(`File ${findAssignment.path} not found`);
    }

    // Remove file and DB entry
    await this.assignmentFileService.removeInPublic(findAssignment.path);
    const deleteAssignmentFile =
      await this.assignmentFileService.removeInDb(id);

    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} is successfully deleted!`,
      deleteAssignmentFile,
    );
  }
}
