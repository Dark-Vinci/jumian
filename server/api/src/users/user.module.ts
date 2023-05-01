import { Logger, Module } from '@nestjs/common';

import { DateScalar } from '../common/scalars/date.scalar';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    // RecipesModule,
  ],
  providers: [UserResolver, UserService, DateScalar, Logger],
})
export class UserModule {}
