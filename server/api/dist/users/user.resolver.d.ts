import { UserService } from './user.service';
import { User } from './models/user.model';
import { UserArgs } from './DTO/usermaker.dto';
import { ProxyLogger } from 'sdk/dist/logger';
import { Logger } from '@nestjs/common';
export declare class UserResolver extends ProxyLogger {
    private readonly userService;
    constructor(userService: UserService, logger: Logger);
    getUsers(recipesArgs: UserArgs): Promise<User[]>;
    private logMetadata;
}
