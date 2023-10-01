import { ObjectType, Field, Int, Directive, ID } from '@nestjs/graphql';
import { Company } from 'src/common/shared_db/company.entity';
import { Country } from 'src/common/shared_db/country.entity';
import { DetailCompanyStructure } from 'src/common/shared_db/detail_company_structure.entity';
import { State } from 'src/common/shared_db/state.entity';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Directive('@key(fields:"id")')
@Entity("schools")
export class School {
  @Field((type) => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({length:400})
  school:string;

  @Field()
  @Column({length:15})
  contact1:string;

  @Field({nullable:true})
  @Column({length: 400, nullable:true})
  postal_address?:string;

  @Field()
  @Column({length: 400, unique:true})
  email:string;

  @Field(() => State)
  state:State

  @Field()
  @Column()
  state_id:number;


  @Field(() => Country)
  country:Country

  @Field()
  @Column()
  country_id:number;


  
  @Field(() => Company)
  company:Company

  @Field()
  @Column()
  company_id:string;


  @Field(() => DetailCompanyStructure)
  detail_company_structure:DetailCompanyStructure

  @Field()
  @Column()
  detail_company_structure_id:string;

  @Field()
  @Column({length:400})
  location:string;

  @Field()
  @Column({type:"date"})
  date_establish:Date;


  @Field({nullable:true})
  @Column({length:400, nullable:true})
  logo:string;

 @Field({nullable:true})
 @Column({length:400, nullable:true})
 old_student_name:string;


@Field()
@CreateDateColumn()
created_at: Date;

@Field()
@UpdateDateColumn()
updated_at: Date;


}
