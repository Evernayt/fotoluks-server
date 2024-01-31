import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChangelogsService } from './changelogs.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateChangelogDto } from './dto/create-changelog.dto';
import { GetChangelogsDto } from './dto/get-changelogs.dto';
import { Changelog } from './changelogs.model';
import { UpdateChangelogDto } from './dto/update-changelog.dto';

@ApiTags('Список изменений')
@Controller('changelogs')
export class ChangelogsController {
  constructor(private changelogsService: ChangelogsService) {}

  @ApiOperation({ summary: 'Создание списка изменений' })
  @ApiResponse({ status: 200, type: Changelog })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createChangelogDto: CreateChangelogDto) {
    return this.changelogsService.createChangelog(createChangelogDto);
  }

  @ApiOperation({ summary: 'Получить все списки изменений' })
  @ApiResponse({ status: 200, type: [Changelog] })
  @Get()
  getAll(@Query() getChangelogsDto: GetChangelogsDto) {
    return this.changelogsService.getChangelogs(getChangelogsDto);
  }

  @ApiOperation({ summary: 'Получить список изменений' })
  @ApiResponse({ status: 200, type: Changelog })
  @UseGuards(JwtAuthGuard)
  @Get(':version')
  getOne(@Param('version') version: string) {
    return this.changelogsService.getChangelogByVersion(version);
  }

  @ApiOperation({ summary: 'Изменить список изменений' })
  @ApiResponse({ status: 200, type: Changelog })
  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() updateChangelogDto: UpdateChangelogDto) {
    return this.changelogsService.updateChangelog(updateChangelogDto);
  }
}
