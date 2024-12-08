import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { AssignmentFileService } from './assignment_file.service';
import { CreateAssignmentFileDto } from './dto/create-assignment_file.dto';
import { UpdateAssignmentFileDto } from './dto/update-assignment_file.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { AssignmentFileUpload } from './assignment_file.upload';
import { AssignmentService } from '../assignment/assignment.service';

const TABLE_NAME = 'assignment_file';

@ApiTags(TABLE_NAME)
@Controller(TABLE_NAME)
// @ApiBearerAuth('access-token')
// @UseGuards(JwtAuthGuard)
export class AssignmentFileController {
  constructor(
    private readonly assignmentFileService: AssignmentFileService,
    private readonly assignmentService: AssignmentService,
  ) {}

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
    return { createAssignmentFileDto, assignment_file_upload };
  }

  @Get()
  findAll() {
    return this.assignmentFileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignmentFileService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssignmentFileDto: UpdateAssignmentFileDto,
  ) {
    return this.assignmentFileService.update(+id, updateAssignmentFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignmentFileService.remove(+id);
  }
}
