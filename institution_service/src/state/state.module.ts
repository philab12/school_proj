import { Module } from '@nestjs/common';
import { StateResolver } from './state.resolver';
import { CompanyModule } from 'src/company/company.module';
import { DetailCompanyStructureModule } from 'src/detail_company_structure/detail_company_structure.module';

@Module({
  imports:[CompanyModule, DetailCompanyStructureModule],
  providers: [StateResolver]
})
export class StateModule {}
