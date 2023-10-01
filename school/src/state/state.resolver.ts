import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { State } from 'src/common/shared_db/state.entity';
import { School } from 'src/school/entities/school.entity';
import { SchoolService } from 'src/school/school.service';


@Resolver((of) => State)
export class StateResolver {
    constructor(private readonly schoolService:SchoolService){}

    @ResolveField((of) => [School])
    schools(@Parent() state:State): Promise<School[]>{
        return this.schoolService.forState(state.id)
    }



}
