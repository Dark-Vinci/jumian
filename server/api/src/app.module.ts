/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DirectiveLocation, GraphQLDirective } from 'graphql';

import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    UserModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,

      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
        // de
      },

      subscriptions: {
        'graphql-ws': {
          path: '/grapgql',
          onConnect: (_ctx: any) => {},
          onDisconnect: (_ctx, _code, _reason) => {},
          onSubscribe: (_ctx, _message) => {},
          onNext(_ctx, _message, _args, _result) {},
        },
      },

      playground: true,
      // debug: false,
      context: ({ req }) => ({ req }),

      include: [UserModule],
    }),
  ],
})
export class AppModule {}
