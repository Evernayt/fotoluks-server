import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ChatMessage } from 'src/chat-messages/chat-messages.model';
import { Chat } from 'src/chats/chats.model';
import { Employee } from 'src/employees/employees.model';

interface ChatReadMessageCreationAttrs {
  chatId: number;
  employeeId: number;
  chatMessageId: number;
}

@Table({ tableName: 'chat_read_messages' })
export class ChatReadMessage extends Model<
  ChatReadMessage,
  ChatReadMessageCreationAttrs
> {
  @ApiProperty({ example: 1, description: 'ID прочитанного сообщения' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'ID сообщения' })
  @Column({ type: DataType.INTEGER })
  chatMessageId: number;

  @ForeignKey(() => Chat)
  @Column({ type: DataType.INTEGER })
  chatId: number;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER })
  employeeId: number;

  @BelongsTo(() => Chat, { foreignKey: 'chatId' })
  chat: Chat;

  @BelongsTo(() => Employee, { foreignKey: 'employeeId' })
  employee: Employee;
}
