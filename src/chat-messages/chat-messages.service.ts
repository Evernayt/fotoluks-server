import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ChatMessage } from './chat-messages.model';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { GetChatMessagesDto } from './dto/get-chat-messages.dto';
import { WhereOptions } from 'sequelize';
import { Employee } from 'src/employees/employees.model';
import { UpdateChatMessageDto } from './dto/update-chat-message.dto';

@Injectable()
export class ChatMessagesService {
  constructor(
    @InjectModel(ChatMessage) private chatMessageModel: typeof ChatMessage,
  ) {}

  // DESKTOP
  async createChatMessage(createChatMessageDto: CreateChatMessageDto) {
    const chatMessage = await this.chatMessageModel.create(
      createChatMessageDto,
    );
    return chatMessage;
  }

  // DESKTOP
  async getChatMessages(getChatMessagesDto: GetChatMessagesDto) {
    let { limit, page, chatId } = getChatMessagesDto;
    limit = Number(limit) || 1000;
    page = Number(page) || 1;
    const offset = page * limit - limit;

    let where: WhereOptions<ChatMessage>;
    if (chatId) {
      where = { chatId };
    }

    const chatMessages = await this.chatMessageModel.findAndCountAll({
      limit,
      offset,
      where,
      distinct: true,
      order: [['id', 'DESC']],
      include: [
        {
          model: Employee,
        },
      ],
    });
    return chatMessages;
  }

  // DESKTOP
  async updateChatMessage(updateChatMessageDto: UpdateChatMessageDto) {
    const { id } = updateChatMessageDto;
    const chatMessage = await this.chatMessageModel.update(
      updateChatMessageDto,
      { where: { id } },
    );

    return chatMessage;
  }

  // DESKTOP
  async deleteChatMessage(id: number) {
    const chatMessage = await this.chatMessageModel.destroy({
      where: { id },
    });

    return chatMessage;
  }
}
