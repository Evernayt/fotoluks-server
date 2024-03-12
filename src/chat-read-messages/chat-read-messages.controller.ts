import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatReadMessagesService } from './chat-read-messages.service';
import { ChatReadMessage } from './chat-read-messages.model';
import { UpsertChatReadMessageDto } from './dto/upsert-chat-read-message.dto';

@ApiTags('Прочитанные сообщения чата')
@Controller('chat-read-messages')
export class ChatReadMessagesController {
  constructor(private chatReadMessagesService: ChatReadMessagesService) {}

  @ApiOperation({ summary: 'Создание или изменение прочитанного сообщения' })
  @ApiResponse({ status: 200, type: ChatReadMessage })
  @Post()
  upsert(@Body() upsertChatReadMessageDto: UpsertChatReadMessageDto) {
    return this.chatReadMessagesService.upsertChatReadMessage(
      upsertChatReadMessageDto,
    );
  }
}
