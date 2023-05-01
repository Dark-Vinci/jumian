/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgsType, Field, Int } from '@nestjs/graphql';
// import { Max, Min } from 'class-validator';

@ArgsType()
export class UserArgs {
  @Field((_type) => Int, {
    nullable: true,
    description: 'skip prop',
  })
  //   @Min(0)
  skip = 0;

  @Field((_type) => Int, {
    nullable: true,
    description: 'take prop',
  })
  //   @Min(1)
  //   @Max(50)
  take = 25;
}
