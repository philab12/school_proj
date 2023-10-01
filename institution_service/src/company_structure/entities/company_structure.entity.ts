import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Shared } from 'src/common/shared_db/shared.entity';
import { Company } from 'src/company/entities/company.entity';
import { DetailCompanyStructure } from 'src/detail_company_structure/entities/detail_company_structure.entity';
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class CompanyStructure extends Shared {
  @Field((type) => ID)
@PrimaryGeneratedColumn("uuid")
id: string;

  @Field(() =>  Company)
  @ManyToOne(() => Company, (company) => company.company_structures)
  @JoinColumn({name: "company_id"})
  company:Company

 
  @Field()
  @Column({name: 'company_id'})
  company_id: string;

  @Field()
  @Column({length: 100})
  structure:string;

  @Field((type) => Int)
  @Column({type: "integer"})
  level:number


  @Field(() => [DetailCompanyStructure])
  @OneToMany(() => DetailCompanyStructure, (detail_company_structure) => detail_company_structure.company_structure)
  detail_company_structures: DetailCompanyStructure[]






}
