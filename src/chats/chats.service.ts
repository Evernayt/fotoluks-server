import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chats.model';
import { CreateChatDto } from './dto/create-chat.dto';
import { GetChatsDto } from './dto/get-chats.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatMember } from 'src/chat-members/chat-members.model';
import { Employee } from 'src/employees/employees.model';
import { ChatMessage } from 'src/chat-messages/chat-messages.model';
import { Sequelize } from 'sequelize-typescript';
import { Transaction, WhereOptions } from 'sequelize';
import { LeaveChatDto } from './dto/leave-chat.dto';
import { Literal } from 'sequelize/types/utils';
import { ChatReadMessage } from 'src/chat-read-messages/chat-read-messages.model';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chat) private chatModel: typeof Chat,
    @InjectModel(ChatMember) private chatMemberModel: typeof ChatMember,
    private sequelize: Sequelize,
  ) {}

  // DESKTOP
  async createChat(createChatDto: CreateChatDto) {
    const { creatorId, employeeIds } = createChatDto;

    const t = await this.sequelize.transaction();
    let chat = null;

    try {
      chat = await this.chatModel.create(createChatDto, {
        transaction: t,
      });

      const chatMembers = employeeIds.map((employeeId) => {
        return { chatId: chat.id, employeeId };
      });
      chatMembers.unshift({ chatId: chat.id, employeeId: creatorId });
      await this.chatMemberModel.bulkCreate(chatMembers, {
        transaction: t,
        ignoreDuplicates: true,
      });

      chat = await this.getChat(chat.id, t);

      await t.commit();
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
    return chat;
  }

  // DESKTOP
  async getChats(getChatsDto: GetChatsDto) {
    let { limit, page, employeeId } = getChatsDto;
    limit = Number(limit) || 1000;
    page = Number(page) || 1;
    const offset = page * limit - limit;

    let whereChatReadMessage: WhereOptions<ChatReadMessage> = { employeeId };
    let literalWhere: Literal = Sequelize.literal(`
      EXISTS (
        SELECT *
        FROM chat_members
        WHERE chatId = Chat.id
        AND employeeId = ${employeeId}
      )
    `);

    const chats = await this.chatModel.findAndCountAll({
      limit,
      offset,
      distinct: true,
      attributes: [
        ...Object.keys(this.chatModel.getAttributes()),
        [
          Sequelize.literal(`(
            SELECT
              MAX(id)
              FROM
              chat_messages AS chat_message
              WHERE
              chat_message.chatId = Chat.id
              )`),
          'latestMessageId',
        ],
      ],
      where: literalWhere,
      order: [[Sequelize.literal('latestMessageId'), 'DESC']],
      include: [
        {
          model: ChatMember,
          include: [
            {
              model: Employee,
            },
          ],
        },
        {
          model: Employee,
          as: 'creator',
        },
        {
          model: ChatMessage,
          limit: 1,
          order: [['id', 'DESC']],
        },
        {
          model: ChatReadMessage,
          where: whereChatReadMessage,
          required: false,
        },
      ],
    });
    return chats;
  }

  // DESKTOP
  async getChat(id: number, transaction?: Transaction) {
    const chat = await this.chatModel.findOne({
      attributes: [
        ...Object.keys(this.chatModel.getAttributes()),
        [
          Sequelize.literal(`(
            SELECT
              MAX(id)
              FROM
              chat_messages AS chat_message
              WHERE
              chat_message.chatId = chat.id
              )`),
          'latestMessageId',
        ],
      ],
      order: [[Sequelize.literal('latestMessageId'), 'DESC']],
      where: { id },
      transaction,
      include: [
        {
          model: ChatMember,
          include: [
            {
              model: Employee,
            },
          ],
        },
        {
          model: Employee,
          as: 'creator',
        },
        {
          model: ChatMessage,
          limit: 1,
          order: [['id', 'DESC']],
        },
        {
          model: ChatReadMessage,
        },
      ],
    });
    return chat;
  }

  // DESKTOP
  async updateChat(updateChatDto: UpdateChatDto) {
    const { id, employeeIds } = updateChatDto;

    const t = await this.sequelize.transaction();
    let chat = null;

    try {
      await this.chatModel.update(updateChatDto, {
        where: { id },
        transaction: t,
      });

      if (employeeIds?.length > 0) {
        await this.chatMemberModel.destroy({
          where: { chatId: id },
          transaction: t,
        });
        const chatMembers = employeeIds.map((employeeId) => {
          return { chatId: id, employeeId };
        });
        await this.chatMemberModel.bulkCreate(chatMembers, {
          transaction: t,
          ignoreDuplicates: true,
        });
      }

      chat = await this.getChat(id, t);

      await t.commit();
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
    return chat;
  }

  // DESKTOP
  async leaveChat(leaveChatDto: LeaveChatDto) {
    const { id, employeeId, creatorId } = leaveChatDto;

    const t = await this.sequelize.transaction();
    let chat = null;

    try {
      await this.chatMemberModel.destroy({
        where: { chatId: id, employeeId },
        transaction: t,
      });

      chat = await this.getChat(id, t);

      if (employeeId === creatorId) {
        const chatMembers = await this.chatMemberModel.findAll({
          where: { chatId: id },
          transaction: t,
        });

        if (chatMembers.length > 0) {
          const firstMemberEmployeeId = chatMembers[0].employeeId;
          await this.chatModel.update(
            { creatorId: firstMemberEmployeeId },
            {
              where: { id },
              transaction: t,
            },
          );
          chat = await this.getChat(id, t);
        } else {
          await this.chatModel.destroy({
            where: { id },
            transaction: t,
          });
          chat = null;
        }
      }

      await t.commit();
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
    return chat;
  }

  // DESKTOP
  async deleteChat(id: number) {
    const chat = await this.chatModel.destroy({
      where: { id },
    });
    return chat;
  }
}
