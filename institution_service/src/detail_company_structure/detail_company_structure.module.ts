import { Module } from '@nestjs/common';
import { DetailCompanyStructureService } from './detail_company_structure.service';
import { DetailCompanyStructureResolver } from './detail_company_structure.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailCompanyStructure } from './entities/detail_company_structure.entity';
import { CompanyModule } from 'src/company/company.module';
import { CompanyStructureModule } from 'src/company_structure/company_structure.module';

@Module({
  imports:[TypeOrmModule.forFeature([DetailCompanyStructure]), CompanyModule, CompanyStructureModule],
  providers: [DetailCompanyStructureResolver, DetailCompanyStructureService],
  exports:[DetailCompanyStructureService],
})
export class DetailCompanyStructureModule {}
