import { ChatMessage } from 'src/chat-messages/chat-messages.model';
import { Employee } from 'src/employees/employees.model';
import { Notification } from 'src/notifications/notifications.model';

export interface IOnlineEmployee {
  employeeId: number;
  socketId?: string;
}

export interface INotificationInfo {
  notification: Notification;
  employeeIds: number[];
}

export interface IChatMessageInfo {
  chatMessage: ChatMessage;
  employeeIds: number[];
}

export interface IEditor {
  targetId: number;
  employee: Employee;
  socketId?: string;
}
