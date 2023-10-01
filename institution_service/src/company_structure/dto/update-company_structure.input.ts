import { CreateCompanyStructureInput } from './create-company_structure.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCompanyStructureInput extends PartialType(CreateCompanyStructureInput) {
  @Field()
  id: string;
}
