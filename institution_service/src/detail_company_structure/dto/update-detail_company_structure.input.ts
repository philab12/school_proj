import { CreateDetailCompanyStructureInput } from './create-detail_company_structure.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDetailCompanyStructureInput extends PartialType(CreateDetailCompanyStructureInput) {
  @Field()
  id: string;
}
