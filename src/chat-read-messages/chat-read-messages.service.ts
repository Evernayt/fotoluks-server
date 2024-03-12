import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ChatReadMessage } from './chat-read-messages.model';
import { UpsertChatReadMessageDto } from './dto/upsert-chat-read-message.dto';

@Injectable()
export class ChatReadMessagesService {
  constructor(
    @InjectModel(ChatReadMessage)
    private chatReadMessageModel: typeof ChatReadMessage,
  ) {}

  // DESKTOP
  async upsertChatReadMessage(
    upsertChatReadMessageDto: UpsertChatReadMessageDto,
  ) {
    const { chatId, employeeId } = upsertChatReadMessageDto;

    const chatReadMessage = await this.chatReadMessageModel.findOne({
      where: { chatId, employeeId },
    });
    if (chatReadMessage) {
      await this.chatReadMessageModel.update(upsertChatReadMessageDto, {
        where: { chatId, employeeId },
      });
    } else {
      await this.chatReadMessageModel.create(upsertChatReadMessageDto);
    }
    return chatReadMessage;
  }
}
