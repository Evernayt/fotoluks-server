import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IWatcher } from './socket.types';
import { messaging } from 'firebase-admin';
import { Message } from 'firebase-admin/lib/messaging/messaging-api';
import { Notification } from 'src/notifications/notifications.model';

interface INotificationInfo {
  notification: Notification;
  employeeIds: number[];
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  watchers: IWatcher[] = [];

  addWatcher = (watcher: IWatcher, socketId: string) => {
    !this.watchers.some((x) => x.employee.id === watcher.employee.id) &&
      this.watchers.push({ ...watcher, socketId });
  };

  removeWathcerByEmployeeId = (employeeId: number) => {
    this.watchers = this.watchers.filter((x) => x.employee.id !== employeeId);
  };

  removeWathcer = (socketId: string) => {
    this.watchers = this.watchers.filter((x) => x.socketId !== socketId);
  };

  @SubscribeMessage('sendNotification')
  handleSendNotification(
    @MessageBody() data: INotificationInfo,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.broadcast.emit('getNotification', data);

    const message: Message = {
      data: { data: JSON.stringify(data) },
      topic: 'fotoluks-manager',
      android: { priority: 'high' },
    };
    messaging()
      .send(message)
      .catch((e) => console.log('Firebase messaging error', e));
  }

  @SubscribeMessage('updateOrder')
  handleUpdateOrder(
    @MessageBody() order: any,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.broadcast.emit('getOrder', order);
  }

  @SubscribeMessage('addWatcher')
  handleAddWatcher(
    @MessageBody() watcher: any,
    @ConnectedSocket() socket: Socket,
  ) {
    this.addWatcher(watcher, socket.id);
    this.server.emit('getWatchers', this.watchers);
  }

  @SubscribeMessage('removeWatcher')
  handleRemoveWatcher(
    @MessageBody() employeeId: number,
    @ConnectedSocket() socket: Socket,
  ) {
    this.removeWathcerByEmployeeId(employeeId);
    socket.broadcast.emit('getWatchers', this.watchers);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log('====================================');
    console.log('SOCKET DISCONNECTED');
    console.log('====================================');
    this.removeWathcer(socket.id);
    socket.broadcast.emit('getWatchers', this.watchers);
  }

  handleConnection() {
    console.log('====================================');
    console.log('SOCKET CONNECTED');
    console.log('====================================');
  }
}
