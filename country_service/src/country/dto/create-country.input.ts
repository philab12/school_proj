import { InputType, Int, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateCountryInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(400)
  @Transform((param) => param.value.toUpperCase())
  country: string;

  @Field({nullable:true})
  @IsString()
  @MaxLength(50)
  @Transform((param) => param.value.toUpperCase())
  iso3?: string;

  @Field({nullable:true})
  @IsString()
  @MaxLength(50)
  @Transform((param) => param.value.toUpperCase())
  iso2?: string;


  @Field({nullable:true})
  @IsString()
  @MaxLength(20)
  numeric_code?: string;

  @Field({nullable:true})
  @IsString()
  @MaxLength(100)
  phone_code: string;


  @Field({nullable:true})
  @IsString()
  @MaxLength(400)
  @Transform((param) => param.value.toUpperCase())
  capital?: string;


  @Field({nullable:true})
  @IsString()
  @MaxLength(50)
  @Transform((param) => param.value.toUpperCase())
  currency?: string;


  @Field({nullable:true})
  @IsString()
  @MaxLength(400)
  @Transform((param) => param.value.toUpperCase())
  currency_name?: string;


  @Field({nullable:true})
  @IsString()
  @MaxLength(10)
  currency_symbol?: string;

}
