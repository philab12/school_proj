import { Module } from '@nestjs/common';
import { DetailCompanyStructureResolver } from './detail_company_structure.resolver';
import { SchoolModule } from 'src/school/school.module';

@Module({
  imports:[SchoolModule],
  providers: [DetailCompanyStructureResolver]
})
export class DetailCompanyStructureModule {}
