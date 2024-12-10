import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { CreateArticleDto } from 'src/api/article/dto/create-article.dto';
import { CreateAssignmentDto } from 'src/api/assignment/dto/create-assignment.dto';

export class CreateChainingDto {
  @ApiProperty({ description: 'Article data', type: CreateArticleDto })
  @ValidateNested()
  @IsOptional()
  @Type(() => CreateArticleDto)
  createArticleDto?: CreateArticleDto;

  @ApiProperty({ description: 'Assignment data', type: CreateAssignmentDto })
  @ValidateNested()
  @IsOptional()
  @Type(() => CreateAssignmentDto)
  createAssignmentDto?: CreateAssignmentDto;
}
