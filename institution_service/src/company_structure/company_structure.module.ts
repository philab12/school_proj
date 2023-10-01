import { Module } from '@nestjs/common';
import { CompanyStructureService } from './company_structure.service';
import { CompanyStructureResolver } from './company_structure.resolver';
import { CompanyStructure } from './entities/company_structure.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports:[TypeOrmModule.forFeature([CompanyStructure]), CompanyModule],
  providers: [CompanyStructureResolver, CompanyStructureService],
  exports:[CompanyStructureService]
})
export class CompanyStructureModule {}
