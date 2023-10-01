import { Module } from '@nestjs/common';
import { CompanyResolver } from './company.resolver';
import { SchoolModule } from 'src/school/school.module';

@Module({
  imports:[SchoolModule],
  providers: [CompanyResolver]
})
export class CompanyModule {}
