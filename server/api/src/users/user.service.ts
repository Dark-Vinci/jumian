import crypto from 'crypto';

import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';

class ProxyLogger {
  constructor(
    private readonly logger: any,
    private readonly loggerMetadata: any,
  ) {}

  public log(message: string, options: any = {}): void {
    this.logger.log(message, { ...this.loggerMetadata, ...options });
  }

  public error(message: string, options: any = {}): void {
    this.logger.error(message, { ...this.loggerMetadata, ...options });
  }
}

@Injectable()
export class UserService extends ProxyLogger implements OnModuleInit {
  constructor(@Inject(Logger) logger: Logger) {
    super(logger, {
      packageName: 'UserService',
    });
  }

  onModuleInit() {
    const loggingMetadata = {
      request_id: crypto.randomUUID(),
      methodName: 'onModuleInit',
    };

    this.log('the message', loggingMetadata);
  }

  public findAll() {
    return {} as any;
  }
}
