import { InputType, Int, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateStateInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(40)
  @IsString()
  @Transform((param) => param.value.toUpperCase())
  state: string;

  @Field()
  @IsNotEmpty()
  country_id:number;

  @Field({nullable:true})
  @IsNotEmpty()
  @MaxLength(50)
  @Transform((param) => param.value.toUpperCase())
  state_code:string;
}
