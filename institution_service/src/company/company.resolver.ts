import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, ResolveReference } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { Company } from './entities/company.entity';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@Resolver(() => Company)
@UsePipes(new ValidationPipe({transform: true}))
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Mutation(() => Company)
  createCompany(@Args('createCompanyInput') createCompanyInput: CreateCompanyInput) {
    return this.companyService.create(createCompanyInput);
  }

  @Query(() => [Company], { name: 'getAllCompanies' })
  findAll() {
    return this.companyService.findAll();
  }

  @Query(() => Company, { name: 'company' })
  findOne(@Args('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Mutation(() => Company)
  updateCompany(@Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput) {
    return this.companyService.update(updateCompanyInput.id, updateCompanyInput);
  }

  @Mutation(() => Company)
  removeCompany(@Args('id') id: string) {
    return this.companyService.remove(id);
  }


  @ResolveField()
  country(@Parent() company:Company){
    return {__typename:"Country", id:company.country_id}
  }

  @ResolveField()
  state(@Parent() company:Company){
    return {__typename:"State", id:company.state_id}
  }


  @ResolveReference()
  resolvereference(ref:{__typename:string, id:string}){
    return this.companyService.findOne(ref.id);
  }



  
}
