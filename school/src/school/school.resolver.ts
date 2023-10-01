import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { SchoolService } from './school.service';
import { School } from './entities/school.entity';
import { CreateSchoolInput } from './dto/create-school.input';
import { UpdateSchoolInput } from './dto/update-school.input';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@Resolver(() => School)
@UsePipes(new ValidationPipe({transform:true}))
export class SchoolResolver {
  constructor(private readonly schoolService: SchoolService) {}

  @Mutation(() => School)
  createSchool(@Args('createSchoolInput') createSchoolInput: CreateSchoolInput) {
    return this.schoolService.create(createSchoolInput);
  }

  @Query(() => [School], { name: 'getAllSchools' })
  findAll() {
    return this.schoolService.findAll();
  }

  @Query(() => School, { name: 'getSchool' })
  findOne(@Args('id') id: string) {
    return this.schoolService.findOne(id);
  }

  @Mutation(() => School)
  updateSchool(@Args('updateSchoolInput') updateSchoolInput: UpdateSchoolInput) {
    return this.schoolService.update(updateSchoolInput.id, updateSchoolInput);
  }

  @Mutation(() => School)
  removeSchool(@Args('id') id:string) {
    return this.schoolService.remove(id);
  }


  @ResolveField()
  country(@Parent() school:School){
    return {__typename:"School", id:school.country_id}
  }


  @ResolveField()
  state(@Parent() school:School){
    return {__typename:"School", id:school.state_id}
  }


  @ResolveField()
  company(@Parent() school:School){
    return {__typename:"School", id:school.company_id}
  }


  @ResolveField()
  detail_company_structure(@Parent() school:School){
    return {__typename:"School", id:school.detail_company_structure_id}
  }

  
}
