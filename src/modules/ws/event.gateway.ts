import {
  Inject,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';

import { Server } from 'socket.io';

import { JwtService } from '@nestjs/jwt';
import { SocketWithUserData } from './types';
import { Observable, of } from 'rxjs';
import { WsService } from './ws.service';
import { WsAuthGuard } from 'src/common/guards/ws-auth.guard';

@Injectable()
@UseGuards(WsAuthGuard)
@WebSocketGateway(3002, { cors: true, transports: ['websocket'] })
export class EventGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(
    private readonly jwtService: JwtService,
    private readonly wsService: WsService,
  ) {}

  async afterInit(ws: Server) {
    this.wsService.setServer(ws);
    console.log('inited');
  }

  async handleConnection(client: SocketWithUserData) {
    try {
      const token = client.handshake.headers.authorization.replace(
        'Bearer ',
        '',
      );
      const { sub } = await this.jwtService.decode(token);
      client.user = {
        id: sub,
        lastActiveTime: client.handshake.issued,
      };
      this.wsService.addUserSocket(sub, client);
      console.log(client.user);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }

    console.log('connect ' + client.user.id);
  }

  async handleDisconnect(client: SocketWithUserData) {
    this.wsService.removeUserSocket(client.user.id);
    console.log('disconnect');
  }

  @SubscribeMessage('heartbeat')
  heartbeat(
    @ConnectedSocket() client: SocketWithUserData,
  ): Observable<WsResponse<number> | any> {
    console.log('heartbeat');
    client.user.lastActiveTime = Date.now();
    return of(client.user);
  }

  @SubscribeMessage('chat')
  chat(
    @MessageBody() data: any,
    @ConnectedSocket() client: SocketWithUserData,
  ): Observable<WsResponse<number> | any> {
    console.log(`send message: ${data.message}`);
    this.wsService.pushMessageToUser(data.toUserId, 'chat', {
      fromUser: client.user.id,
      content: data.message,
    });
    return;
  }
}
