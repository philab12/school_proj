import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class CompanyService {

  constructor(@InjectRepository(Company) private readonly companyRepo:Repository<Company>){}

  async create(createCompanyInput: CreateCompanyInput): Promise<Company> {
  
    const email_exist = await this.findByCompanyEmail(createCompanyInput.email);
    if(email_exist) throw new HttpException("Email Already Exist", HttpStatus.CONFLICT)
    
    const newCompany = this.companyRepo.create(createCompanyInput);
     
    return this.companyRepo.save(newCompany);
  }

  async findByCompanyEmail(email:string): Promise<Company> {
    return this.companyRepo.findOne({where:{email}});
  }

  async findAll(): Promise<Company[]> {
    return this.companyRepo.find();
  }

  async findOne(id: string): Promise<Company> {
    return this.companyRepo.findOne({where:{id}});
  }

  async update(id: string, updateCompanyInput: UpdateCompanyInput): Promise<Company> {
    const email_exist = this.companyRepo.findOne({where:{email:updateCompanyInput.email,id:Not(id)}});
    if(email_exist) throw new HttpException("Email Already Exist", HttpStatus.CONFLICT);
    this.companyRepo.update(id,updateCompanyInput);
    return this.findOne(id);
  }

  async remove(id: string): Promise<Company> {
    const company = await this.findOne(id);
    if(!company) throw new HttpException("Company Not Found", HttpStatus.NOT_FOUND);

    const delCompany = this.companyRepo.delete(id);
    if(delCompany) return company
    throw new HttpException("Delete Unsuccessful", HttpStatus.INTERNAL_SERVER_ERROR)
  }

  async forCountry(id:number){
    return this.companyRepo.find({where:{country_id: id}})
  }

  async forState(id:number){
    return this.companyRepo.find({where:{state_id: id}})
  }
}
