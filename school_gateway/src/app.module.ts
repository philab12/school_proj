import { Module } from '@nestjs/common';
import { ApolloGatewayDriverConfig, ApolloGatewayDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { IntrospectAndCompose } from '@apollo/gateway';

@Module({
  imports: [ GraphQLModule.forRoot<ApolloGatewayDriverConfig>({

    driver: ApolloGatewayDriver,
    server: {
       //  cors: true,
    },

    gateway: {
      supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
          { name: 'institutions', url: 'http://localhost:3001/graphql' },
          { name: 'country', url: 'http://localhost:3002/graphql' },
           { name: 'school', url: 'http://localhost:3003/graphql' },
           { name: 'level', url: 'http://localhost:3004/graphql' },
        ],
      }),
    }
    
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
