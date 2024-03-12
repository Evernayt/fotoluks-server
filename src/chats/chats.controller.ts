import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatsService } from './chats.service';
import { Chat } from './chats.model';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateChatDto } from './dto/create-chat.dto';
import { GetChatsDto } from './dto/get-chats.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { LeaveChatDto } from './dto/leave-chat.dto';

@ApiTags('Чаты')
@Controller('chats')
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @ApiOperation({ summary: 'Создание чата' })
  @ApiResponse({ status: 200, type: Chat })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatsService.createChat(createChatDto);
  }

  @ApiOperation({ summary: 'Получить чаты' })
  @ApiResponse({ status: 200, type: [Chat] })
  @Get()
  getAll(@Query() getChatsDto: GetChatsDto) {
    return this.chatsService.getChats(getChatsDto);
  }

  @ApiOperation({ summary: 'Получить чат' })
  @ApiResponse({ status: 200, type: Chat })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.chatsService.getChat(id);
  }

  @ApiOperation({ summary: 'Изменить чат' })
  @ApiResponse({ status: 200, type: Chat })
  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() updateChatDto: UpdateChatDto) {
    return this.chatsService.updateChat(updateChatDto);
  }

  @ApiOperation({ summary: 'Выйти из чата' })
  @ApiResponse({ status: 200, type: Chat })
  @UseGuards(JwtAuthGuard)
  @Put('leave')
  leave(@Body() leaveChatDto: LeaveChatDto) {
    return this.chatsService.leaveChat(leaveChatDto);
  }

  @ApiOperation({ summary: 'Удалить чат' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.chatsService.deleteChat(id);
  }
}
