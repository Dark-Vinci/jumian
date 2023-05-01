import { Test, TestingModule } from '@nestjs/testing';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let userController: UserResolver;

  beforeEach(async () => {
    const user: TestingModule = await Test.createTestingModule({
      controllers: [UserResolver],
      providers: [UserService],
    }).compile();

    userController = user.get<UserResolver>(UserResolver);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(userController.getUsers({} as any)).toBe('Hello World!');
    });
  });
});
