import { Module, forwardRef } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Chat } from './chats.model';
import { ChatMember } from 'src/chat-members/chat-members.model';

@Module({
  providers: [ChatsService],
  controllers: [ChatsController],
  imports: [
    SequelizeModule.forFeature([Chat, ChatMember]),
    forwardRef(() => AuthModule),
  ],
})
export class ChatsModule {}
