import { InputType, Int, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { IsUnique } from 'src/common/validation/is-unique';

@InputType()
export class CreateLevelInput {
  @IsNotEmpty()
  @IsString()
  @MaxLength(400)
  @Field()
  @IsUnique({tableName:'levels', column:'level', column2:"school_id"})
  @Transform((param) => param.value.toUpperCase())
  level: string;

  @IsNotEmpty()
  @Field()
  school_id:string;

  create

}
