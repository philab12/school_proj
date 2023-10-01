import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Country } from 'src/common/shared_db/country.entity';
import { CompanyService } from 'src/company/company.service';
import { Company } from 'src/company/entities/company.entity';
import { DetailCompanyStructureService } from 'src/detail_company_structure/detail_company_structure.service';
import { DetailCompanyStructure } from 'src/detail_company_structure/entities/detail_company_structure.entity';

@Resolver((of) => Country)
export class CountryResolver {
    constructor(private readonly companyService:CompanyService, private readonly detailCompanyStructureService: DetailCompanyStructureService){}

    @ResolveField((of) => [Company])
    companies(@Parent() country:Country): Promise<Company[]>{
        return this.companyService.forCountry(country.id)
    }


    @ResolveField((of) => [DetailCompanyStructure])
    detail_company_structures(@Parent() country:Country): Promise<DetailCompanyStructure[]>{
        return this.detailCompanyStructureService.forCountry(country.id)
    }
}
