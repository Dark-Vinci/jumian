import crypto from 'crypto';

import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ProxyLogger } from 'sdk/dist/logger';

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
