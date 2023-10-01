import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { Company } from "src/company/entities/company.entity";
import { DetailCompanyStructure } from "src/detail_company_structure/entities/detail_company_structure.entity";

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class Country {
    @Field((type) => ID)
    @Directive('@external')
    id:number;

    @Field((type) => [Company])
    companies: Company[]

    @Field((type) => [DetailCompanyStructure])
    detail_company_structures: DetailCompanyStructure[]

 


}