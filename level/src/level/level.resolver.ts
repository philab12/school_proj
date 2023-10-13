import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { LevelService } from './level.service';
import { Level } from './entities/level.entity';
import { CreateLevelInput } from './dto/create-level.input';
import { UpdateLevelInput } from './dto/update-level.input';

@Resolver(() => Level)
export class LevelResolver {
  constructor(private readonly levelService: LevelService) {}

  @Mutation(() => Level)
  createLevel(@Args('createLevelInput') createLevelInput: CreateLevelInput) {
    return this.levelService.create(createLevelInput);
  }

  @Query(() => [Level], { name: 'level' })
  findAll(@Args("school_id") school_id:string) {
    return this.levelService.findAll(school_id);
  }

  @Query(() => Level, { name: 'level' })
  findOne(@Args('id') id: string) {
    return this.levelService.findOne(id);
  }

  @Mutation(() => Level)
  updateLevel(@Args('updateLevelInput') updateLevelInput: UpdateLevelInput) {
    return this.levelService.update(updateLevelInput.id, updateLevelInput);
  }

  @Mutation(() => Level)
  removeLevel(@Args('id') id: string) {
    return this.levelService.remove(id);
  }


  @ResolveField()
  school(@Parent() level:Level){
    return {__typename:"Level", id:level.school_id}
  }
}
