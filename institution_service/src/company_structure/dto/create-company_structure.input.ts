import { InputType, Int, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateCompanyStructureInput {
  @Field()
  @IsNotEmpty()
  company_id: string;

 
  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  @Field()
  @Transform((param) => param.value.toUpperCase())
  structure:string;

 // (param) => param.value.toUpperCase()


  @IsNotEmpty()
  @IsNumber()
  @Field((type) => Int)
  level:number
}
