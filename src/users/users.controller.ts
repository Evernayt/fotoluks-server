import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { GetUsersDto } from './dto/get-users.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Query() getUsersDto: GetUsersDto) {
    return this.usersService.getUsers(getUsersDto);
  }

  @ApiOperation({ summary: 'Получить пользователя по номеру телефона' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Get('phone/:phone')
  getOneByPhone(@Param('phone') phone: string) {
    return this.usersService.getUserByPhone(phone);
  }

  @ApiOperation({ summary: 'Получить пользователя' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.usersService.getUser(id);
  }

  @ApiOperation({ summary: 'Изменить пользователя' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(updateUserDto);
  }

  @ApiOperation({ summary: 'Изменить пароль пользователя' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Put('password')
  updatePassword(@Body() updateUserPasswordDto: UpdateUserPasswordDto) {
    return this.usersService.updateUserPassword(updateUserPasswordDto);
  }

  @ApiOperation({ summary: 'Синхронизировать с МойСклад' })
  @UseGuards(JwtAuthGuard)
  @Get('sync/:moyskladId')
  syncOne(@Param('moyskladId') moyskladId: string) {
    return this.usersService.syncOneFromMoysklad(moyskladId);
  }
}
