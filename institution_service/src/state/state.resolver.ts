import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { State } from 'src/common/shared_db/state.entity';
import { CompanyService } from 'src/company/company.service';
import { Company } from 'src/company/entities/company.entity';
import { DetailCompanyStructureService } from 'src/detail_company_structure/detail_company_structure.service';
import { DetailCompanyStructure } from 'src/detail_company_structure/entities/detail_company_structure.entity';

@Resolver((of) => State)
export class StateResolver {
    constructor(private readonly companyService:CompanyService, private readonly detailCompanyStructureService:DetailCompanyStructureService){}

    @ResolveField((of) => [Company])
    companies(@Parent() state:State): Promise<Company[]>{
        return this.companyService.forState(state.id)
    }


    @ResolveField((of) => [DetailCompanyStructure])
    detail_company_structures(@Parent() state:State): Promise<DetailCompanyStructure[]>{
        return this.detailCompanyStructureService.forState(state.id)
    }

}
