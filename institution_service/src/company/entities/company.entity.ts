import { ObjectType, Field, Int, ID, Directive } from '@nestjs/graphql';
import { YESNO } from 'src/common/enums/enums';
import { Country } from 'src/common/shared_db/country.entity';
import { Shared } from 'src/common/shared_db/shared.entity';
import { State } from 'src/common/shared_db/state.entity';
import { CompanyStructure } from 'src/company_structure/entities/company_structure.entity';
import { DetailCompanyStructure } from 'src/detail_company_structure/entities/detail_company_structure.entity';
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Directive('@key(fields:"id")')
@Entity()
export class Company extends Shared {
  @Field((type) => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;
  

  @Field()
  @Column({length: "500"})
  name:string;

  @Field()
  @Column({length: 15})
  contact1:string;

  @Field()
  @Column({length: 15, nullable:true})
  contact2:string;

  @Field()
  @Column({length: 300, unique: true})
  email:string

  @Field(() => [CompanyStructure])
  @OneToMany(() => CompanyStructure, (company_structure) => company_structure.company)
  company_structures: CompanyStructure[]

  @Field(() => [DetailCompanyStructure])
  @OneToMany(() => DetailCompanyStructure, (detail_company_structure) => detail_company_structure.company)
  detail_company_structures: DetailCompanyStructure[]

  @Field(()=> Country)
  country: Country

  @Column({nullable:true})
  @Field({nullable:true})
  country_id?:number;

  @Field(() => State)
  state:State

  @Column({nullable:true})
  @Field({nullable:true})
  state_id:number

  @Field()
  @Column({type:"enum", enum:YESNO})
  is_active:YESNO



}
