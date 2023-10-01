import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { DetailCompanyStructure } from 'src/common/shared_db/detail_company_structure.entity';
import { School } from 'src/school/entities/school.entity';
import { SchoolService } from 'src/school/school.service';

@Resolver((of) => DetailCompanyStructure)
export class DetailCompanyStructureResolver {

    constructor(private readonly schoolService:SchoolService){}

    @ResolveField((of) => [School])
    schools(@Parent() detail_company_structure:DetailCompanyStructure): Promise<School[]>{
        return this.schoolService.forDetailCompanyStructure(detail_company_structure.id)
    }
}
