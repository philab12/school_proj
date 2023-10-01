import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { CompanyStructureService } from './company_structure.service';
import { CompanyStructure } from './entities/company_structure.entity';
import { CreateCompanyStructureInput } from './dto/create-company_structure.input';
import { UpdateCompanyStructureInput } from './dto/update-company_structure.input';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@Resolver(() => CompanyStructure)
@UsePipes(new ValidationPipe({transform: true}))
export class CompanyStructureResolver {
  constructor(private readonly companyStructureService: CompanyStructureService) {}

  @Mutation(() => CompanyStructure)
  createCompanyStructure(@Args('createCompanyStructureInput') createCompanyStructureInput: CreateCompanyStructureInput) {
    return this.companyStructureService.create(createCompanyStructureInput);
  }

  @Query(() => [CompanyStructure], { name: 'getAllcompanyStructure' })
  findStructureByCompany(@Args("company_id") company_id:string) {
    return this.companyStructureService.findStructureByCompany(company_id);
  }

  @Query(() => CompanyStructure, { name: 'getCompanyStructure' })
  findOne(@Args('id') id: string) {
    return this.companyStructureService.findOne(id);
  }

  @Mutation(() => CompanyStructure)
  updateCompanyStructure(@Args('updateCompanyStructureInput') updateCompanyStructureInput: UpdateCompanyStructureInput) {
    return this.companyStructureService.update(updateCompanyStructureInput.id, updateCompanyStructureInput);
  }

  @Mutation(() => CompanyStructure)
  removeCompanyStructure(@Args('id') id: string) {
    return this.companyStructureService.remove(id);
  }

  @ResolveField()
  company(@Parent() companyStruc:CompanyStructure){
    return this.companyStructureService.getCompany(companyStruc.company_id);
  }
}
