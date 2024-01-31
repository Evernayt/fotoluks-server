import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { INotificationInfo, IEditor } from './socket.types';
import { messaging } from 'firebase-admin';
import { Message } from 'firebase-admin/lib/messaging/messaging-api';
import SocketService from './socket.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  socketService = new SocketService();

  @SubscribeMessage('addOnlineEmployee')
  handleAddOnlineEmployee(
    @MessageBody() employeeId: number,
    @ConnectedSocket() socket: Socket,
  ) {
    this.socketService.addOnlineEmployee(employeeId, socket.id);
    this.server.emit(
      'getOnlineEmployees',
      this.socketService.getOnlineEmployees(),
    );
  }

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

  @SubscribeMessage('addOrderEditor')
  handleAddOrderEditor(
    @MessageBody() orderEditor: IEditor,
    @ConnectedSocket() socket: Socket,
  ) {
    this.socketService.addOrderEditor(orderEditor, socket.id);
    this.server.emit('getOrderEditors', this.socketService.getOrderEditors());
  }

  @SubscribeMessage('removeOrderEditor')
  handleRemoveOrderEditor(
    @MessageBody() employeeId: number,
    @ConnectedSocket() socket: Socket,
  ) {
    this.socketService.removeOrderEditorByEmployeeId(employeeId);
    socket.broadcast.emit(
      'getOrderEditors',
      this.socketService.getOrderEditors(),
    );
  }

  @SubscribeMessage('addMoveEditor')
  handleAddMoveEditor(
    @MessageBody() moveEditor: IEditor,
    @ConnectedSocket() socket: Socket,
  ) {
    this.socketService.addMoveEditor(moveEditor, socket.id);
    this.server.emit('getMoveEditors', this.socketService.getMoveEditors());
  }

  @SubscribeMessage('removeMoveEditor')
  handleRemoveMoveEditor(
    @MessageBody() employeeId: number,
    @ConnectedSocket() socket: Socket,
  ) {
    this.socketService.removeMoveEditorByEmployeeId(employeeId);
    socket.broadcast.emit(
      'getMoveEditors',
      this.socketService.getMoveEditors(),
    );
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.socketService.removeOnlineEmployee(socket.id);
    socket.broadcast.emit(
      'getOnlineEmployees',
      this.socketService.getOnlineEmployees(),
    );

    this.socketService.removeOrderEditor(socket.id);
    socket.broadcast.emit(
      'getOrderEditors',
      this.socketService.getOrderEditors(),
    );

    this.socketService.removeMoveEditor(socket.id);
    socket.broadcast.emit(
      'getMoveEditors',
      this.socketService.getMoveEditors(),
    );

    console.log('====================================');
    console.log('SOCKET DISCONNECTED');
    console.log('====================================');
  }

  handleConnection() {
    this.server.emit('getOrderEditors', this.socketService.getOrderEditors());
    this.server.emit('getMoveEditors', this.socketService.getMoveEditors());

    console.log('====================================');
    console.log('SOCKET CONNECTED');
    console.log('====================================');
  }
}
