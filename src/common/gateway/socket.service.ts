import { IOnlineEmployee, IEditor } from './socket.types';

export default class SocketService {
  private onlineEmployees: IOnlineEmployee[] = [];
  private orderEditors: IEditor[] = [];
  private moveEditors: IEditor[] = [];

  getOnlineEmployees = () => {
    return this.onlineEmployees;
  };

  getOnlineEmployee = (socketId: string) => {
    return this.onlineEmployees.find((x) => x.socketId === socketId);
  };

  addOnlineEmployee = (employeeId: number, socketId: string) => {
    this.onlineEmployees.push({ employeeId, socketId: socketId });
  };

  removeOnlineEmployee = (socketId: string) => {
    this.onlineEmployees = this.onlineEmployees.filter(
      (x) => x.socketId !== socketId,
    );
  };

  getOrderEditors = () => {
    return this.orderEditors;
  };

  addOrderEditor = (orderEditor: IEditor, socketId: string) => {
    !this.orderEditors.some((x) => x.employee.id === orderEditor.employee.id) &&
      this.orderEditors.push({ ...orderEditor, socketId });
  };

  removeOrderEditorByEmployeeId = (employeeId: number) => {
    this.orderEditors = this.orderEditors.filter(
      (x) => x.employee.id !== employeeId,
    );
  };

  removeOrderEditor = (socketId: string) => {
    this.orderEditors = this.orderEditors.filter(
      (x) => x.socketId !== socketId,
    );
  };

  getMoveEditors = () => {
    return this.moveEditors;
  };

  addMoveEditor = (moveEditor: IEditor, socketId: string) => {
    !this.moveEditors.some((x) => x.employee.id === moveEditor.employee.id) &&
      this.moveEditors.push({ ...moveEditor, socketId });
  };

  removeMoveEditorByEmployeeId = (employeeId: number) => {
    this.moveEditors = this.moveEditors.filter(
      (x) => x.employee.id !== employeeId,
    );
  };

  removeMoveEditor = (socketId: string) => {
    this.moveEditors = this.moveEditors.filter((x) => x.socketId !== socketId);
  };
}
