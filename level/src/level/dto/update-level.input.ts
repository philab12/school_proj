import { CreateLevelInput } from './create-level.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateLevelInput extends PartialType(CreateLevelInput) {
  @Field(()=> ID)
  id: string;
}
