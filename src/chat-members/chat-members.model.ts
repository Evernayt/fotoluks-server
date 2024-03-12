import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Employee } from 'src/employees/employees.model';
import { Chat } from 'src/chats/chats.model';

interface ChatMemberCreationAttrs {
  employeeId: number;
  chatId: number;
}

@Table({ tableName: 'chat_members' })
export class ChatMember extends Model<ChatMember, ChatMemberCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID участника чата' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

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
