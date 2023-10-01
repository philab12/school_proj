import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriverConfig, ApolloDriver, ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { dataSourceOptions } from 'db/data-source';
import { join } from 'path';
// import { CompanyModule } from './company/company.module';
// import { CompanyStructureModule } from './company_structure/company_structure.module';
// import { DetailCompanyStructureModule } from './detail_company_structure/detail_company_structure.module';
import { Country } from './common/shared_db/country.entity';
import { CountryModule } from './country/country.module';
import { StateModule } from './state/state.module';
import { State } from './common/shared_db/state.entity';
import { SchoolModule } from './school/school.module';
import { DetailCompanyStructure } from './common/shared_db/detail_company_structure.entity';
import { DetailCompanyStructureModule } from './detail_company_structure/detail_company_structure.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ".env"
  }), TypeOrmModule.forRoot(dataSourceOptions), GraphQLModule.forRoot<ApolloFederationDriverConfig>({
    driver: ApolloFederationDriver,
    autoSchemaFile: {path:join(process.cwd(), 'src/institution-graphql-schema.gql'), federation: 2},
    buildSchemaOptions: {
      orphanedTypes: [Country, State, DetailCompanyStructure]
    }
  }), CountryModule, StateModule, SchoolModule, DetailCompanyStructureModule, CompanyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
