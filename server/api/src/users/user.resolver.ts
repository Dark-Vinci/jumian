/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Args, Query } from '@nestjs/graphql';

import { UserService } from './user.service';
import { User } from './models/user.model';
import { UserArgs } from './DTO/usermaker.dto';

@Resolver((_of: unknown) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((_returns: unknown) => [User])
  public getUsers(@Args() recipesArgs: UserArgs): Promise<User[]> {
    console.log({ recipesArgs });
    return this.userService.findAll();
  }
}
