import { ObjectType, Field, Int, Directive, ID } from '@nestjs/graphql';
import { Shared } from 'src/common/shared_db/shared.entity';
import { State } from 'src/state/entities/state.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Directive('@key(fields:"id")')
@Entity("countries")
export class Country extends Shared {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({length:400})
  country:string;

  @Field({nullable:true})
  @Column({nullable: true, length:50})
  iso3?:string

  @Field({nullable:true})
  @Column({nullable: true, length:50})
  iso2?:string


  @Field({nullable:true})
  @Column({nullable: true, length:20})
  numeric_code?:string


  @Field({nullable:true})
  @Column({nullable: true, length:100})
  phone_code?:string


  @Field({nullable:true})
  @Column({nullable: true, length:400})
  capital?:string

  @Field({nullable:true})
  @Column({nullable: true, length:50})
  currency?:string


  @Field({nullable:true})
  @Column({nullable: true, length:400})
  currency_name?:string;

  @Field({nullable:true})
  @Column({nullable: true, length:10})
  currency_symbol?:string

  
  @Field(() => [State])
  @OneToMany(() => State, state => state.country)
  states:State[]


}
