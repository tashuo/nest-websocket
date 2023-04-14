import { DataSource } from 'typeorm';
import { ConfigService } from 'nestjs-config';
import { resolve } from 'path';

const configService = ConfigService.loadSync(
  resolve(__dirname, '../config/!(*.d).{ts,js}'),
  {
    path: resolve(__dirname, '../../.env'),
  },
);
const dataSource = new DataSource({
  ...configService.get('database'),
  entities: [resolve(__dirname, '../modules/**/entities/*.{js,ts}')],
  migrations: [resolve(__dirname, '../database/migrations/*.{js,ts}')],
  synchronize: false,
  autoLoadEntities: true,
});

export default dataSource;
