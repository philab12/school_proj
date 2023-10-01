import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export class Shared  {

    
@Field()
@CreateDateColumn()
created_at: Date;

@Field()
@UpdateDateColumn()
updated_at: Date;


}