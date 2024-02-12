import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { IFile } from './models/IFile';
import getBytesByMb from 'src/common/helpers/getBytesByMb';

@ApiTags('Файлы')
@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @ApiOperation({ summary: 'Загрузка аватара' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: getBytesByMb(5) },
    }),
  )
  uploadAvatar(@UploadedFile() file: IFile) {
    return this.filesService.uploadAvatar(file);
  }

  @ApiOperation({ summary: 'Загрузка файла Fotoluks Manager' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post('upload-manager-file')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: getBytesByMb(300) },
    }),
  )
  uploadManagerFile(@UploadedFile() file: IFile) {
    return this.filesService.uploadManagerFile(file);
  }

  // @ApiOperation({ summary: 'Загрузка файла' })
  // @ApiResponse({ status: 200 })
  // @NotCheckVersionGuard()
  // @UseGuards(JwtAuthGuard)
  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadSingle(
  //   @Body() fileUploadDto: FileUploadDto,
  //   @UploadedFile() file: any,
  // ) {
  //   return this.filesService.upload(fileUploadDto, file);
  // }

  // @ApiOperation({ summary: 'Загрузка файлов' })
  // @ApiResponse({ status: 200 })
  // @NotCheckVersionGuard()
  // @UseGuards(JwtAuthGuard)
  // @Post('uploads')
  // @UseInterceptors(FilesInterceptor('files', 100))
  // uploadMultiple(
  //   @Body() fileUploadDto: FileUploadDto,
  //   @UploadedFiles() files: any[],
  // ) {
  //   return this.filesService.uploads(fileUploadDto, files);
  // }
}
