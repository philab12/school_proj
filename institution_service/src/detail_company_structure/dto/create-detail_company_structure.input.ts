import { InputType, Int, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { YESNO } from 'src/common/enums/enums';

@InputType()
export class CreateDetailCompanyStructureInput {
  @Field()
  @IsNotEmpty()
  company_id: string;

  @Field()
  @IsNotEmpty()
  company_structure_id: string;

  @IsNotEmpty()
  @MaxLength(500)
  @IsString()
  @Field()
  @Transform((param) => param.value.toUpperCase())
  detail_company_structure:string;

  @Field({nullable:true})
  higher_structure_id?: string;

  @IsEnum(YESNO)
  @IsNotEmpty()
  @Field()
  is_active:YESNO;


  @IsNotEmpty()
  @MaxLength(15)
  @IsString()
  @Field()
  contact1:string;


  @MaxLength(300)
  @IsEmail()
  @Field({nullable:true})
  email:string;


  @IsNotEmpty()
  @Field()
  country_id:number


  @IsNotEmpty()
  @Field()
  state_id:number



}
