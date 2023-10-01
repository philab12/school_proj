import { ObjectType, Field, Int, Directive, ID } from '@nestjs/graphql';
import { YESNO } from 'src/common/enums/enums';
import { Country } from 'src/common/shared_db/country.entity';
import { Shared } from 'src/common/shared_db/shared.entity';
import { State } from 'src/common/shared_db/state.entity';
import { Company } from 'src/company/entities/company.entity';
import { CompanyStructure } from 'src/company_structure/entities/company_structure.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Directive('@key(fields:"id")')
@Entity("detail_company_structures")
export class DetailCompanyStructure extends Shared {

  @Field((type) => ID)
@PrimaryGeneratedColumn("uuid")
id: string;
  
  @Field(() =>  Company)
  @ManyToOne(() => Company, (company) => company.detail_company_structures)
  @JoinColumn({name: "company_id"})
  company:Company

  @Field()
  @Column({name: 'company_id'})
  company_id: string;


  @Field(() =>  CompanyStructure)
  @ManyToOne(() => CompanyStructure, (company_structure) => company_structure.detail_company_structures)
  @JoinColumn({name: "company_structure_id"})
  company_structure:CompanyStructure


  @Field()
  @Column({name: 'company_structure_id'})
  company_structure_id: string;


  @Field()
  @Column({length: 500})
  detail_company_structure:string;


  @Field(() => [DetailCompanyStructure])
  @OneToMany(() => DetailCompanyStructure, (detail_company_structure) => detail_company_structure.higher_structure)
  higher_structures: DetailCompanyStructure[]


  @Field(() =>  DetailCompanyStructure,{nullable:true})
  @ManyToOne(() => DetailCompanyStructure, (detail_higher_structure) => detail_higher_structure.higher_structures)
  @JoinColumn({name: "higher_structure_id"})
  higher_structure?:DetailCompanyStructure



  @Field({nullable:true})
  @Column({name: 'higher_structure_id', nullable:true})
  higher_structure_id?: string;

  @Field()
  @Column({type:"enum", enum: YESNO})
  is_active:YESNO;

  @Field()
  @Column({length: 15})
  contact1:string;

  @Field({nullable:true})
  @Column({length: 300, nullable:true})
  email:string


  @Field(() => Country)
  country:Country;

  @Column({nullable:true})
  @Field({nullable:true})
  country_id:number

  @Field(() => State)
  state:State

  @Column({nullable:true})
  @Field({nullable:true})
  state_id:number




}
