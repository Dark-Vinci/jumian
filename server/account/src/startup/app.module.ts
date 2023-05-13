import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV_FILE_PATH } from 'sdk/dist/constants';
import { DbType } from 'sdk/dist/types/enums';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import User from '../models/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService,
      ): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> => {
        return {
          port: +configService.get('DB_PORT'),
          host: configService.get('DB_HOST'),
          type: DbType[configService.get('DB_DBMS_TYPE')],
          synchronize: Boolean(configService.get('DB_SYNCHRONY')),
          entities: [User],
          database: String(configService.get('DB_NAME')),
          username: configService.get('DB_USERNAME'),
          password: String(configService.get('DB_PASSWORD')),
          logger: configService.get('DB_LOGGER_TYPE'),
          migrationsTableName: configService.get('DB_MIGRATION_TABLE_NAME'),
          logging: true,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
