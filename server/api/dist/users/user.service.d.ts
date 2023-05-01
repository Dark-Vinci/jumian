import { Logger, OnModuleInit } from '@nestjs/common';
declare class ProxyLogger {
    private readonly logger;
    private readonly loggerMetadata;
    constructor(logger: any, loggerMetadata: any);
    log(message: string, options?: any): void;
    error(message: string, options?: any): void;
}
export declare class UserService extends ProxyLogger implements OnModuleInit {
    constructor(logger: Logger);
    onModuleInit(): void;
    findAll(): any;
}
export {};
