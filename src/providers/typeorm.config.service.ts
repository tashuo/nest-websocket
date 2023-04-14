import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from 'nestjs-config';
import { resolve } from 'path';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...this.config.get('database'),
      entities: [resolve(__dirname, '../modules/**/entities/*.{js,ts}')],
      synchronize: false,
      autoLoadEntities: true,
    };
  }
}
