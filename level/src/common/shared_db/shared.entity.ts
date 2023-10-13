import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Directive('@key(fields:"id")')
@Entity()
export class Shared  {
@Field((type) => ID)
@PrimaryGeneratedColumn("uuid")
id: string;
    
@Field()
@CreateDateColumn()
created_at: Date;

@Field()
@UpdateDateColumn()
updated_at: Date;


}