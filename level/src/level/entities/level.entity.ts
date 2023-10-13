import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';
import { School } from 'src/common/shared_db/school.entity';
import { Shared } from 'src/common/shared_db/shared.entity';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Directive('@key(fields:"id")')
@Entity("levels")
export class Level extends Shared {
 
 @Field(() => School)
  school:School;


  @Field()
  @Column()
  school_id:string;

  @Field()
  @Column()
  level:string;

}
