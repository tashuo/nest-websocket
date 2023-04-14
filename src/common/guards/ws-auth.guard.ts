import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { isClientAliveNow } from 'src/modules/ws/helper';
import { SocketWithUserData } from 'src/modules/ws/types';

@Injectable()
export class WsAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs()?.getClient<SocketWithUserData>();
    const active = isClientAliveNow(client.user.lastActiveTime);
    active || client.disconnect();
    return active;
  }
}
