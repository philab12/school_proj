import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriverConfig, ApolloDriver, ApolloFederationDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { dataSourceOptions } from 'db/data-source';
import { join } from 'path';
import { CountryModule } from './country/country.module';
import { StateModule } from './state/state.module';


@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ".env"
  }), TypeOrmModule.forRoot(dataSourceOptions), GraphQLModule.forRoot<ApolloFederationDriverConfig>({
    driver: ApolloFederationDriver,
    autoSchemaFile: {path: join(process.cwd(), 'src/country-graphql-schema.gql'), federation: 2}
  }), CountryModule, StateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
