/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Args, Query } from '@nestjs/graphql';
import { Inject, Logger } from '@nestjs/common';
import { ProxyLogger } from 'sdk/dist/logger';

import { UserService } from './user.service';
import { User } from './models/user.model';
import { UserArgs } from './DTO/usermaker.dto';

@Resolver((_of: unknown) => User)
export class UserResolver extends ProxyLogger {
  constructor(
    private readonly userService: UserService,
    @Inject(Logger) logger: Logger,
  ) {
    super(logger, {
      packageName: 'UserResolver',
    });
  }

  @Query((_returns: unknown) => [User])
  public getUsers(@Args() recipesArgs: UserArgs): Promise<User[]> {
    console.log({ recipesArgs });
    const meta = this.logMetadata(crypto.randomUUID(), 'getUsers');
    return this.userService.findAll();
  }
}
