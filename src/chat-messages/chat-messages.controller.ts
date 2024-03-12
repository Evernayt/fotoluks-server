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
import { ChatMessagesService } from './chat-messages.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ChatMessage } from './chat-messages.model';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { GetChatMessagesDto } from './dto/get-chat-messages.dto';
import { UpdateChatMessageDto } from './dto/update-chat-message.dto';

@ApiTags('Сообщения чата')
@Controller('chat-messages')
export class ChatMessagesController {
  constructor(private chatMessagesService: ChatMessagesService) {}

  @ApiOperation({ summary: 'Создание сообщения' })
  @ApiResponse({ status: 200, type: ChatMessage })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createChatMessageDto: CreateChatMessageDto) {
    return this.chatMessagesService.createChatMessage(createChatMessageDto);
  }

  @ApiOperation({ summary: 'Получить сообщения' })
  @ApiResponse({ status: 200, type: [ChatMessage] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Query() getChatMessagesDto: GetChatMessagesDto) {
    return this.chatMessagesService.getChatMessages(getChatMessagesDto);
  }

  @ApiOperation({ summary: 'Изменить сообщение' })
  @ApiResponse({ status: 200, type: ChatMessage })
  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() updateChatMessageDto: UpdateChatMessageDto) {
    return this.chatMessagesService.updateChatMessage(updateChatMessageDto);
  }

  @ApiOperation({ summary: 'Удалить сообщение' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.chatMessagesService.deleteChatMessage(id);
  }
}
