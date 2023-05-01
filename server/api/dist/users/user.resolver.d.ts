import { UserService } from './user.service';
import { User } from './models/user.model';
import { UserArgs } from './DTO/usermaker.dto';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(recipesArgs: UserArgs): Promise<User[]>;
}
