import cluster from 'cluster';
import process from 'process';
import { cpus } from 'os';

import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';

import { AppModule } from './app.module';

import { createLogger } from 'winston';
import { Logger } from '@nestjs/common';

import winston = require('winston');

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

export const initWinston = (apiTitle: string) => {
  const logger = createLogger({
    level: 'debug',
    levels: logLevels,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
      winston.format.colorize(),
      winston.format.align(),
    ),
    defaultMeta: { service: apiTitle },
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
    exceptionHandlers: [
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
      new winston.transports.File({ filename: 'exceptions.log' }),
    ],
    rejectionHandlers: [
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
      new winston.transports.File({ filename: 'rejections.log' }),
    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    );
  }

  return logger;
};

class Application {
  // get the number of available CPU cores
  private static readonly numCPUs = cpus().length;

  public static async start(): Promise<void> {
    switch (true) {
      case cluster.isPrimary: {
        // Primary task of the main cluster is to create a fork of the application and listen to errors
        Logger.log(`Primary ${process.pid} is running`);

        // create a fork on the number of available cores
        // for (let i = 0; i < this.numCPUs; i++) {
        for (let i = 0; i < 1; i++) {
          cluster.fork();
        }

        // Spin out a new fork when an error is encountered with a process
        cluster.on('exit', (worker, code, signal) => {
          Logger.error(
            `worker ${worker.process.pid} died, code ${code}, signal ${signal}`,
          );
          // cluster.fork();
        });

        break;
      }

      default: {
        // create an instance of the nest application
        // initWinston('api');
        const app = await NestFactory.create(AppModule, {
          logger: WinstonModule.createLogger({
            instance: initWinston('api'),
          }),
        });

        await app.listen(3002, 'localhost', async () => {
          const url = await app.getUrl();

          Logger.log(
            `Application running on url ${url}, on worker with pid: ${process.pid}`,
          );
        });
      }
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
Application.start().then((_el) => {});
