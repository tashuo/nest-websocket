import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './providers/typeorm.config.service';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { WsModule } from './modules/ws/ws.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    UserModule,
    AuthModule,
    WsModule,
    ConfigModule.load(path.resolve(__dirname, 'config', '!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    {
      ...JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => ({
          secret: await config.get('app.jwtSecret'),
          signOptions: {
            expiresIn: '1d',
          },
        }),
      }),
      global: true,
    },
    {
      ...BullModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          redis: {
            host: config.get('redis.host'),
            port: config.get('redis.port'),
            password: config.get('redis.password'),
          },
        }),
      }),
      global: true,
    },
    {
      ...BullModule.registerQueue({
        name: 'chat',
      }),
      global: true,
    },
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
