import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  users = [];
  watchers = [];

  addWatcher = (watcher: any, socketId: string) => {
    !this.watchers.some((x) => x.user.id === watcher.user.id) &&
      this.watchers.push({ ...watcher, socketId });
  };

  removeWathcerByUserId = (userId: number) => {
    this.watchers = this.watchers.filter((x) => x.user.id !== userId);
  };

  removeWathcer = (socketId: string) => {
    this.watchers = this.watchers.filter((x) => x.socketId !== socketId);
  };

  @SubscribeMessage('sendNotification')
  handleSendNotification(
    @MessageBody() notification: any,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.broadcast.emit('getNotification', notification);
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
    @MessageBody() userId: number,
    @ConnectedSocket() socket: Socket,
  ) {
    this.removeWathcerByUserId(userId);
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
