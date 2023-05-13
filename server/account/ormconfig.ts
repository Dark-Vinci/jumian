import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

import User from './src/models/user.model';

config();

const configService = new ConfigService();

const dataSourceOptions = {
  port: configService.get<number>('DB_PORT'),
  host: configService.get<string>('DB_HOST'),
  type: configService.get<string>('DB_DBMS_TYPE'),
  synchronize: configService.get<boolean>('DB_SYNCHRONY'),
  database: configService.get<string>('DB_NAME'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  logger: configService.get<string>('DB_LOGGER'),
  migrationsTableName: configService.get<string>('DB_MIGRATION_TABLE_NAME'),
  logging: configService.get<boolean>('DB_LOGGING'),
  entities: [User],
} as TypeOrmModuleOptions;

export default new DataSource(<DataSourceOptions>dataSourceOptions);
