import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Country } from 'src/common/shared_db/country.entity';
import { School } from 'src/school/entities/school.entity';
import { SchoolService } from 'src/school/school.service';


@Resolver((of) => Country)
export class CountryResolver {
    constructor(private readonly schoolService:SchoolService){}

    @ResolveField((of) => [School])
    async schools(@Parent() country:Country): Promise<School[]>{
        return this.schoolService.forCountry(country.id)
    }


  
}
