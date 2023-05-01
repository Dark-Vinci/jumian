/* eslint-disable @typescript-eslint/no-unused-vars */
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'user schema object' })
export class User {
  @Field((_type) => ID, {
    nullable: false,
    description: 'id atm',
    defaultValue: '00000000-0000-0000-0000-000000000000',
    name: 'id',
  })
  id: string;

  @Directive('@upper')
  title: string;

  @Field({
    nullable: true,
    description: 'description atm',
    defaultValue: '',
    name: 'description',
  })
  description?: string;

  @Field({
    nullable: false,
    description: 'date created',
    name: 'creation_date',
    defaultValue: new Date(),
  })
  creationDate: Date;

  @Field((_type) => [String], {
    nullable: false,
    description: 'ingredients description',
    name: 'ingredients',
    defaultValue: [],
  })
  ingredients: string[];
}
