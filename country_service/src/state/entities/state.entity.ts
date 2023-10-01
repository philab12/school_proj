import { UsePipes, ValidationPipe } from '@nestjs/common';
import { ObjectType, Field, Int, ID, Directive } from '@nestjs/graphql';
import { Shared } from 'src/common/shared_db/shared.entity';
import { Country } from 'src/country/entities/country.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Directive('@key(fields:"id")')
@Entity("states")
export class State extends Shared {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({length:400})
  state: string;

  @Field(() => Country)
  @ManyToOne(() => Country, (country) => country.states)
  @JoinColumn({name:"country_id"})
  country: Country;

  @Field()
  @Column({name: 'country_id'})
  country_id: number;

  @Field({nullable:true})
  @Column({length:50, nullable:true})
  state_code:string;
}
