import { InputType, Int, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateSchoolInput {
  @IsNotEmpty()
  @IsString()
  @MaxLength(400)
  @Field()
  @Transform((param) => param.value.toUpperCase())
  school: string;


  @IsNotEmpty()
  @MaxLength(15)
  @Field()
  contact1: string;

  @IsNotEmpty()
  @MaxLength(400)
  @Field({nullable:true})
  postal_address?: string;


  @IsNotEmpty()
  @MaxLength(400)
  @IsEmail()
  @Field()
  email: string;


  @IsNotEmpty()
  @Field()
  state_id:number;

  @IsNotEmpty()
  @Field()
  country_id:number;

  @IsNotEmpty()
  @Field()
  company_id:string;


  @IsNotEmpty()
  @Field()
  detail_company_structure_id:string;


  @IsNotEmpty()
  @IsString()
  @MaxLength(400)
  @Field()
  location: string;


  @IsNotEmpty()
  @IsDate()
  @Field()
  date_establish: Date;


  @IsNotEmpty()
  @IsString()
  @MaxLength(400)
  @Field({nullable:true})
  logo?: string;


  @MaxLength(400)
  @Field({nullable:true})
  old_student_name?: string;

}
