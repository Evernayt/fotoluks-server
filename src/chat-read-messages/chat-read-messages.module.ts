import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChatReadMessage } from './chat-read-messages.model';
import { ChatReadMessagesService } from './chat-read-messages.service';
import { ChatReadMessagesController } from './chat-read-messages.controller';

@Module({
  providers: [ChatReadMessagesService],
  controllers: [ChatReadMessagesController],
  imports: [SequelizeModule.forFeature([ChatReadMessage])],
})
export class ChatReadMessagesModule {}
