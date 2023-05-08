import { Logger } from '@nestjs/common';
import { ProxyLogger } from 'sdk/dist/logger';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { UserArgs } from './DTO/usermaker.dto';
export declare class UserResolver extends ProxyLogger {
    private readonly userService;
    constructor(userService: UserService, logger: Logger);
    getUsers(recipesArgs: UserArgs): Promise<User[]>;
}
