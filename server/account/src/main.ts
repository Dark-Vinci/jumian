import cluster from 'cluster';
import process from 'process';
import { cpus } from 'os';
import { join } from 'path';
// import request from 'sdk';

// console.log({ request });

import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './startup/app.module';

class Application {
  // get the number of available CPU cores
  private static readonly numCPUs = cpus().length;

  // GRPC options
  private static readonly options = {
    url: `localhost:3000`,
    package: 'account',

    protoPath: join(__dirname, '../../sdk/GRPC/account/account.proto'),
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
        console.log(`Primary ${process.pid} is running`);

        // create a fork on the number of available cores
        for (let i = 0; i < this.numCPUs; i++) {
          cluster.fork();
        }

        // Spin out a new fork when an error is encountered with a process
        cluster.on('exit', (worker, code, signal) => {
          console.log(
            `worker ${worker.process.pid} died, code ${code}, signal ${signal}`,
          );
          cluster.fork();
        });

        break;
      }

      default: {
        // create an instance of the nest application
        const app = await NestFactory.createMicroservice(AppModule, {
          transport: Transport.GRPC,
          options: this.options,
        });

        await app.listen();
        console.log(
          `Application running on url localhost:${3000}, on worker with pid: ${
            process.pid
          }`,
        );
      }
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
Application.start().then((_el) => {});
