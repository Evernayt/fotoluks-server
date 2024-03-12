import { Module, forwardRef } from '@nestjs/common';
import { ChatMessagesService } from './chat-messages.service';
import { ChatMessagesController } from './chat-messages.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChatMessage } from './chat-messages.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ChatMessagesService],
  controllers: [ChatMessagesController],
  imports: [
    SequelizeModule.forFeature([ChatMessage]),
    forwardRef(() => AuthModule),
  ],
})
export class ChatMessagesModule {}
