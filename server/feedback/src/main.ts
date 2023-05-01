import cluster from 'cluster';
import process from 'process';
import { cpus } from 'os';
import { join } from 'path';

import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { initWinston } from 'sdk/dist/logger';
import { AppEnv, ProtoPath, RPCServiceName, RPCUrl } from 'sdk';

import { AppModule } from './startup/app.module';
import { WinstonModule } from 'nest-winston';

class Application {
  // get the number of available CPU cores
  private static numCPUs = cpus().length;

  // GRPC options
  private static readonly options = {
    url: RPCUrl.FEEDBACK,
    package: RPCServiceName.FEEDBACK,

    protoPath: join(__dirname, ProtoPath.FEEDBACK),
    loader: {
      enums: String,
      objects: true,
      arrays: true,
    },
  };

  public static async start(): Promise<void> {
    switch (true) {
      case cluster.isPrimary: {
        // Primary task of the main cluster is to create a fork of the application and listen to errors
        Logger.log(`Primary ${process.pid} is running`);

        // RUN one instance in development
        if (process.env.NODE_ENV === AppEnv.DEVELOPMENT) {
          this.numCPUs = 1;
        }

        // create a fork on the number of available cores
        for (let i = 0; i < this.numCPUs; i++) {
          cluster.fork();
        }

        // Spin out a new fork when an error is encountered with a process
        cluster.on('exit', (worker, code, signal) => {
          Logger.log(
            `worker ${worker.process.pid} died, code ${code}, signal ${signal}`,
          );

          const numWorkers = Object.keys(cluster.workers).length;

          // make the fork only in staging and production mode
          if (
            process.env.NODE_ENV !== AppEnv.DEVELOPMENT &&
            numWorkers < this.numCPUs
          ) {
            cluster.fork();
          }
        });

        break;
      }

      default: {
        // create an instance of the nest application
        const app = await NestFactory.createMicroservice(AppModule, {
          transport: Transport.GRPC,
          options: this.options,
          logger: WinstonModule.createLogger({
            instance: initWinston(RPCServiceName.FEEDBACK),
          }),
        });

        await app.listen();
        Logger.log(
          `Application running on url localhost:${3003}, on worker with pid: ${
            process.pid
          }`,
        );
      }
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
Application.start().then((_el) => {});
