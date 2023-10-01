import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Company } from 'src/common/shared_db/company.entity';
import { School } from 'src/school/entities/school.entity';
import { SchoolService } from 'src/school/school.service';

@Resolver((of) => Company)
export class CompanyResolver {
    constructor(private readonly schoolService:SchoolService){}

    @ResolveField((of) => [School])
    async schools(@Parent() company:Company): Promise<School[]>{
        return this.schoolService.forCompany(company.id)
    }

}
