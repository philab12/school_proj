import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyStructureInput } from './dto/create-company_structure.input';
import { UpdateCompanyStructureInput } from './dto/update-company_structure.input';
import { CompanyStructure } from './entities/company_structure.entity';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class CompanyStructureService {
  constructor(@InjectRepository(CompanyStructure) private readonly csRepo:Repository<CompanyStructure>, private readonly companyService:CompanyService){}

  async create(createCompanyStructureInput: CreateCompanyStructureInput): Promise<CompanyStructure> {
    const company_structure_exist = await this.findByStructure(createCompanyStructureInput.structure, createCompanyStructureInput.company_id);
    //If Company Structure Exist Throw An Exception
    if(company_structure_exist) throw new HttpException("Company Structure Already Exist",HttpStatus.CONFLICT);
    //Check If Level Of Structure Already Assigned In This Company
    const company_structure_level_exist = await this.csRepo.findOne({where:{level:createCompanyStructureInput.level, company_id:createCompanyStructureInput.company_id}})
      if(company_structure_level_exist) throw new HttpException("Level Already Assigned To A Different Structure", HttpStatus.CONFLICT);

    //If Structure Does Not Exist Create New Company Structure
    const newStructure = this.csRepo.create(createCompanyStructureInput);
    return this.csRepo.save(newStructure)

  }

  async findByStructure(structure:string, company_id: string) : Promise<CompanyStructure>{
      return this.csRepo.findOne({where:{structure, company_id}});
  }

  async findStructureByCompany(company_id:string): Promise<CompanyStructure[]> {
    return this.csRepo.find({where:{company_id}});
  }

  async findOne(id: string): Promise<CompanyStructure> {
    return this.csRepo.findOne({where:{id}});
  }

  async update(id: string, updateCompanyStructureInput: UpdateCompanyStructureInput) :Promise<CompanyStructure> {
    //Check if Structure is created in other fields
    const structure_exist = await this.csRepo.findOne({where:{structure:updateCompanyStructureInput.structure, company_id:updateCompanyStructureInput.company_id,id:Not(id)}})
    if(structure_exist) throw new HttpException("Company Structure Already Exist",HttpStatus.CONTINUE);

     //Check If Level Of Structure Already Assigned In This Company
     const company_structure_level_exist = await this.csRepo.findOne({where:{level:updateCompanyStructureInput.level, company_id:updateCompanyStructureInput.company_id, id:Not(id)}})
     if(company_structure_level_exist) throw new HttpException("Level Already Assigned To A Different Structure", HttpStatus.CONFLICT);


    //Update new Structure
     const updatedStructure = this.csRepo.update(id, updateCompanyStructureInput)
     //If Update Successfull return updated data else throw exception
     if(updatedStructure) return this.findOne(id);
     throw new HttpException("Update Of Company Structure Unsuccessfull",HttpStatus.INTERNAL_SERVER_ERROR);


  }

  async remove(id: string) {
    const structure = await this.findOne(id);
    if(!structure) throw new HttpException("ID Not Found", HttpStatus.NOT_FOUND);
     const delStructure = await this.csRepo.delete(id)
     if(delStructure) return structure
     throw new HttpException("Delete Unsuccessful", HttpStatus.INTERNAL_SERVER_ERROR);

  }

  async getCompany(id:string){
    return this.companyService.findOne(id);
  }
}
