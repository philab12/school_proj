import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSchoolInput } from './dto/create-school.input';
import { UpdateSchoolInput } from './dto/update-school.input';
import { InjectRepository } from '@nestjs/typeorm';
import { School } from './entities/school.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class SchoolService {
  constructor(@InjectRepository(School) private readonly schoolRepo:Repository<School>){}

  async create(createSchoolInput: CreateSchoolInput): Promise<School> {
    //Check If School Already Exist In This Company
    const school_exist = await this.findBySchool(createSchoolInput.school, createSchoolInput.company_id);
    if(school_exist) throw new HttpException("This School Already Exist", HttpStatus.CONFLICT);
    const newScool = this.schoolRepo.create(createSchoolInput);
    const saveSchool = await this.schoolRepo.save(newScool);
    if(saveSchool) return saveSchool
    throw new HttpException("This School Could Not Be Saved Successfully", HttpStatus.INTERNAL_SERVER_ERROR); 
  
  }

  async findAll(): Promise<School[]> {
    return this.schoolRepo.find();
  }

  async findBySchool(school:string, company_id:string): Promise<School>
  {
    return this.schoolRepo.findOne({where:{school, company_id}})
  }

  async findOne(id: string): Promise<School> {
    return this.schoolRepo.findOne({where:{id}});
  }

  async update(id: string, updateSchoolInput: UpdateSchoolInput): Promise<School> {
    //Check If This School Already Exist In Another Field
    const school_exist = await this.schoolRepo.findOne({where:{school:updateSchoolInput.school, company_id:updateSchoolInput.company_id, id:Not(id)}})
    if(school_exist) throw new HttpException("This School Already Exist In This Company", HttpStatus.CONFLICT)
    const updateSchool = await this.schoolRepo.update(id, updateSchoolInput);
  if(updateSchool) return this.findOne(id);

  throw new HttpException("This School Could Not Be Updated Successfully", HttpStatus.INTERNAL_SERVER_ERROR);
    
  }

  async remove(id: string): Promise<School>{
    const id_exist = await this.findOne(id)
    if(!id_exist) throw new HttpException("This ID Not Found",HttpStatus.NOT_FOUND)
    const del_school = await this.schoolRepo.delete(id);
  if(del_school) return id_exist
    throw new HttpException("This Data Could Not Be Deleted", HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async forCountry(country_id:number){
    return this.schoolRepo.find({where:{country_id}})
  }


  async forState(state_id:number){
    return this.schoolRepo.find({where:{state_id}})
  }

  async forDetailCompanyStructure(detail_company_structure_id:string){
    return this.schoolRepo.find({where:{detail_company_structure_id:detail_company_structure_id}});
  }

  async forCompany(company_id:string){
    return this.schoolRepo.find({where:{company_id}});
  }
}
