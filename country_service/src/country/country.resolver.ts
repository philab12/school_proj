import { Resolver, Query, Mutation, Args, Int, ResolveReference, ID } from '@nestjs/graphql';
import { CountryService } from './country.service';
import { Country } from './entities/country.entity';
import { CreateCountryInput } from './dto/create-country.input';
import { UpdateCountryInput } from './dto/update-country.input';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@Resolver(() => Country)
@UsePipes(new ValidationPipe({transform: true}))
export class CountryResolver {
  constructor(private readonly countryService: CountryService) {}

  @Mutation(() => Country)
  createCountry(@Args('createCountryInput') createCountryInput: CreateCountryInput) {
    return this.countryService.create(createCountryInput);
  }

  @Query(() => [Country], { name: 'getAllCountries' })
  findAll() {
    return this.countryService.findAll();
  }

  @Query(() => Country, { name: 'getCountry' })
  findOne(@Args('id',{type: () => Int}) id: number) {
    return this.countryService.findOne(id);
  }

  @Mutation(() => Country)
  updateCountry(@Args('updateCountryInput') updateCountryInput: UpdateCountryInput) {
    return this.countryService.update(updateCountryInput.id, updateCountryInput);
  }

  @Mutation(() => Country)
  removeCountry(@Args('id',{type: () => Int}) id: number) {
    return this.countryService.remove(id);
  }

  @ResolveReference()
  resolvereference(ref:{__typename:string, id:number}){
    return this.countryService.findOne(ref.id);
  }
}
