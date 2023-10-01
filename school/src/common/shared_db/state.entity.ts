import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { School } from "src/school/entities/school.entity";


@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class State {

    @Field((type) => ID)
    @Directive('@external')
    id:number

    @Field(() => [School])
    schools: School[]



}