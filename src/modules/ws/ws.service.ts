import { Injectable } from '@nestjs/common';
import { SocketWithUserData, UserSocket } from './types';
import { Server } from 'socket.io';
import { isClientAliveNow } from './helper';
import { isNil } from 'lodash';

@Injectable()
export class WsService {
  // userId => socket id
  private userSocket: UserSocket;

  private server: Server;

  constructor() {
    this.userSocket = new Map();
  }

  setServer(server: Server) {
    this.server = server;
  }

  initUserSocket() {
    this.userSocket = new Map();
  }

  getUserSocket(userId: number) {
    return this.userSocket.get(userId);
  }

  addUserSocket(userId: number, client: SocketWithUserData) {
    this.userSocket.set(userId, client);
  }

  removeUserSocket(userId: number) {
    this.userSocket.delete(userId);
  }

  async pushMessageToUser(toUserId: number, event: string, data: any) {
    const client = this.getUserSocket(toUserId);
    console.log(client);
    if (isNil(client) || !isClientAliveNow(client.user.lastActiveTime)) {
      console.log(`${toUserId} offline`);
      return;
    }
    client.emit(event, data);
  }
}
