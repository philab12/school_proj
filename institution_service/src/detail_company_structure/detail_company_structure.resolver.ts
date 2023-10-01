import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, ResolveReference } from '@nestjs/graphql';
import { DetailCompanyStructureService } from './detail_company_structure.service';
import { DetailCompanyStructure } from './entities/detail_company_structure.entity';
import { CreateDetailCompanyStructureInput } from './dto/create-detail_company_structure.input';
import { UpdateDetailCompanyStructureInput } from './dto/update-detail_company_structure.input';
import { UsePipes, ValidationPipe } from '@nestjs/common';


@Resolver(() => DetailCompanyStructure)
@UsePipes(new ValidationPipe({transform: true}))
export class DetailCompanyStructureResolver {
  constructor(private readonly detailCompanyStructureService: DetailCompanyStructureService) {}

  @Mutation(() => DetailCompanyStructure)
  createDetailCompanyStructure(@Args('createDetailCompanyStructureInput') createDetailCompanyStructureInput: CreateDetailCompanyStructureInput) {
    return this.detailCompanyStructureService.create(createDetailCompanyStructureInput);
  }

  @Query(() => [DetailCompanyStructure], { name: 'getAllDetailCompanyStructure' })
  findAll(@Args('company_id') company_id: string) {
    return this.detailCompanyStructureService.findAll(company_id);
  }

  @Query(() => DetailCompanyStructure, { name: 'getDetailCompanyStructure' })
  findOne(@Args('id') id: string) {
    return this.detailCompanyStructureService.findOne(id);
  }

  @Mutation(() => DetailCompanyStructure)
  updateDetailCompanyStructure(@Args('updateDetailCompanyStructureInput') updateDetailCompanyStructureInput: UpdateDetailCompanyStructureInput) {
    return this.detailCompanyStructureService.update(updateDetailCompanyStructureInput.id, updateDetailCompanyStructureInput);
  }

  @Mutation(() => DetailCompanyStructure)
  removeDetailCompanyStructure(@Args('id') id: string) {
    return this.detailCompanyStructureService.remove(id);
  }


  @ResolveField()
  company(@Parent() detailCompanyStruct:DetailCompanyStructure){
    return this.detailCompanyStructureService.getCompany(detailCompanyStruct.company_id);
  }


  @ResolveField()
  company_structure(@Parent() detailCompanyStruct:DetailCompanyStructure){
    return this.detailCompanyStructureService.getStructure(detailCompanyStruct.company_structure_id);
  }


  @ResolveField()
  higher_structure(@Parent() detailCompanyStruct:DetailCompanyStructure){
    return this.detailCompanyStructureService.findOneHigher(detailCompanyStruct.higher_structure_id);
  }


  @ResolveField()
  country(@Parent() detailCompanyStructureService:DetailCompanyStructure){
  return {__typename: "Detail_Company_Structure", id:detailCompanyStructureService.country_id}
  }


  @ResolveField()
  state(@Parent() detailCompanyStructureService:DetailCompanyStructure){
  return {__typename: "Detail_Company_Structure", id:detailCompanyStructureService.state_id}
  }


  @ResolveReference()
  resolvereference(ref:{__typename:string, id:string}){
    return this.detailCompanyStructureService.findOne(ref.id)
  }

}
