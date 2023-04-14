import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { UserService } from '../user/user.service';
import { ConfigService } from 'nestjs-config';

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UserService,
    {
      provide: 'JWT_TOKEN',
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return await config.get('app.jwtSecret');
      },
    },
  ],
  imports: [UserModule, PassportModule],
})
export class AuthModule {}
