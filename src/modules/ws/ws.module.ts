import { Global, Module } from '@nestjs/common';
import { EventGateway } from './event.gateway';
import { WsService } from './ws.service';

@Global()
@Module({
  providers: [EventGateway, WsService],
  exports: [WsService],
})
export class WsModule {}
