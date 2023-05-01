import { Logger, OnModuleInit } from '@nestjs/common';
import { ProxyLogger } from 'sdk/dist/logger';
export declare class UserService extends ProxyLogger implements OnModuleInit {
    constructor(logger: Logger);
    onModuleInit(): void;
    findAll(): any;
}
