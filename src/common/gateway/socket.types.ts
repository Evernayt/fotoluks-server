export interface IWatcher {
  employee: IEmployee;
  orderId: number;
  socketId?: string;
}

interface IEmployee {
  id: number;
  name: string;
  login: string;
  archive: boolean;
  avatar?: string;
}

export interface IOnlineEmployee {
  employeeId: number;
  socketId?: string;
}
