import { InputType, Int, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { YESNO } from 'src/common/enums/enums';

@InputType()
export class CreateCompanyInput {
 

  @IsNotEmpty()
  @MaxLength(500)
  @IsString()
  @Field()
  @Transform((param) => param.value.toUpperCase())
  name:string;
 



  @IsNotEmpty()
  @MaxLength(15)
  @IsString()
  @Field()
  contact1:string;

  @Field({nullable:true})
  contact2:string;


  @IsNotEmpty()
  @MaxLength(300)
  @IsEmail()
  @Field()
  email:string


  @IsNotEmpty()
  @Field()
  country_id:number;

  @IsNotEmpty()
  @Field()
  state_id:number;

  @IsEnum(YESNO)
  @IsNotEmpty()
  @Field()
  is_active:YESNO



}
