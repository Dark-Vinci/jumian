import cluster from 'cluster';
import process from 'process';
import { cpus } from 'os';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './startup/app.module';

class Application {
  // get the number of available CPU cores
  private static readonly numCPUs = cpus().length;

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
        const app = await NestFactory.create(AppModule);

        await app.listen(3001, 'localhost', async () => {
          const url = await app.getUrl();

          console.log(
            `Application running on url ${url}, on worker with pid: ${process.pid}`,
          );
        });
      }
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
Application.start().then((_el) => {});
