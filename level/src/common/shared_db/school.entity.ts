import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { Level } from "src/level/entities/level.entity";


@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class School {
    @Field((type) => ID)
    @Directive('@external')
    id:string;

    @Field((type) => [Level])
    levels: Level[]



 


}