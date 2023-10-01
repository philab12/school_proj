import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { Company } from "src/company/entities/company.entity";
import { DetailCompanyStructure } from "src/detail_company_structure/entities/detail_company_structure.entity";

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class State {

    @Field((type) => ID)
    @Directive('@external')
    id:number

    @Field(() => [Company])
    companies: Company[]

    @Field(() => [DetailCompanyStructure])
    detail_company_structures: DetailCompanyStructure[]

}