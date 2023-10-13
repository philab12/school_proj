import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { School } from 'src/common/shared_db/school.entity';
import { Level } from 'src/level/entities/level.entity';
import { LevelService } from 'src/level/level.service';

@Resolver((of) => School)
export class SchoolResolver {

    constructor(private readonly levelService: LevelService){}

    @ResolveField((of) => [Level])
    async levels(@Parent() school:School): Promise<Level[]>{
        return this.levelService.forSchool(school.id)
    }


}
