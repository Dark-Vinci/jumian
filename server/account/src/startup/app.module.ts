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
          port: configService.get<number>('DB_PORT'),
          host: configService.get<string>('DB_HOST'),
          type: DbType[configService.get<string>('DB_DBMS_TYPE')],
          synchronize: configService.get<boolean>('DB_SYNCHRONY'),
          database: configService.get<string>('DB_NAME'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          logger: configService.get('DB_LOGGER_TYPE'),
          migrationsTableName: configService.get<string>(
            'DB_MIGRATION_TABLE_NAME',
          ),
          logging: configService.get('DB_LOGGING'),
          entities: [User],
        };
      },
    }),

    //     connect to redis
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
