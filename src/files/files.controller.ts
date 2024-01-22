import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileUploadDto } from './dto/file-upload.dto';
import { FilesService } from './files.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { NotCheckVersionGuard } from 'src/checkVersion.guard';

@ApiTags('Файлы')
@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @ApiOperation({ summary: 'Загрузка аватара' })
  @ApiResponse({ status: 200 })
  @NotCheckVersionGuard()
  @UseGuards(JwtAuthGuard)
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(@UploadedFile() file: any) {
    return this.filesService.avatar(file);
  }

  @ApiOperation({ summary: 'Загрузка файла' })
  @ApiResponse({ status: 200 })
  @NotCheckVersionGuard()
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadSingle(
    @Body() fileUploadDto: FileUploadDto,
    @UploadedFile() file: any,
  ) {
    return this.filesService.upload(fileUploadDto, file);
  }

  @ApiOperation({ summary: 'Загрузка файлов' })
  @ApiResponse({ status: 200 })
  @NotCheckVersionGuard()
  @UseGuards(JwtAuthGuard)
  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files', 100))
  uploadMultiple(
    @Body() fileUploadDto: FileUploadDto,
    @UploadedFiles() files: any[],
  ) {
    return this.filesService.uploads(fileUploadDto, files);
  }
}
