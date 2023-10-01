import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCountryInput } from './dto/create-country.input';
import { UpdateCountryInput } from './dto/update-country.input';
import { Country } from './entities/country.entity';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CountryService {

  constructor(@InjectRepository(Country) private readonly countryRepo:Repository<Country>){}

  async create(createCountryInput: CreateCountryInput): Promise<Country | undefined> {
    //Check If Country Already Exist
    const country_exist = await this.findByCountry(createCountryInput.country);
    if(country_exist) throw new HttpException("This Country Already Exist", HttpStatus.CONFLICT)
    //If Country Does Not Exist Create New Country
  const newCountry = this.countryRepo.create(createCountryInput);
   const createdCountry = await this.countryRepo.save(newCountry);
   if(createdCountry) return createdCountry
   throw new HttpException("Country Could Not Be Created Successfully", HttpStatus.INTERNAL_SERVER_ERROR);
  }

  findAll() : Promise<Country[] | undefined> {
    return this.countryRepo.find();
  }

  async findByCountry(country:string) : Promise<Country | undefined>{
    return this.countryRepo.findOne({where:{country}});
  }

  findOne(id: number) : Promise<Country | undefined> {
    return this.countryRepo.findOne({where:{id}});
  }

  async update(id: number, updateCountryInput: UpdateCountryInput) {
    //Check If Country Exist In Another Field
    const country_exist = await this.countryRepo.findOne({where:{country:updateCountryInput.country, id:Not(id)}});
    if(country_exist) throw new HttpException("This Country Already Exist", HttpStatus.CONFLICT);
    //Update Country
    const updCountry = await this.countryRepo.update(id, updateCountryInput);
    if(updCountry) return await this.findOne(id);
    throw new HttpException("Country Could Not Be Updated Successfully", HttpStatus.CONFLICT);
  }

  async remove(id: number) : Promise<Country> {
    const id_exist = await this.findOne(id);
    if(!id_exist) throw new HttpException("This ID Not Found", HttpStatus.NOT_FOUND);
    const delCountry = this.countryRepo.delete(id);
    if(delCountry) return id_exist;
    throw new HttpException("Country Could Not Be Deleted", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
