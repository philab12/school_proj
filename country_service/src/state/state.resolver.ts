import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, ResolveReference } from '@nestjs/graphql';
import { StateService } from './state.service';
import { State } from './entities/state.entity';
import { CreateStateInput } from './dto/create-state.input';
import { UpdateStateInput } from './dto/update-state.input';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@Resolver(() => State)
@UsePipes(new ValidationPipe({transform:true}))
export class StateResolver {
  constructor(private readonly stateService: StateService) {}

  @Mutation(() => State)
  createState(@Args('createStateInput') createStateInput: CreateStateInput) {
    return this.stateService.create(createStateInput);
  }

  @Query(() => [State], { name: 'getAllStates' })
  findAll() {
    return this.stateService.findAll();
  }

  @Query(() => State, { name: 'getState' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.stateService.findOne(id);
  }

  @Mutation(() => State)
  updateState(@Args('updateStateInput') updateStateInput: UpdateStateInput) {
    return this.stateService.update(updateStateInput.id, updateStateInput);
  }

  @Mutation(() => State)
  removeState(@Args('id', { type: () => Int }) id: number) {
    return this.stateService.remove(id);
  }

  @ResolveField()
  country(@Parent() state:State){
    return this.stateService.getCountry(state.country_id)
  }

  @ResolveReference()
  resolvereference(ref:{__typename:string, id:number}){
    return this.stateService.findOne(ref.id);
  }
}
