import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDetailCompanyStructureInput } from './dto/create-detail_company_structure.input';
import { UpdateDetailCompanyStructureInput } from './dto/update-detail_company_structure.input';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailCompanyStructure } from './entities/detail_company_structure.entity';
import { Not, Repository } from 'typeorm';
import { CompanyService } from 'src/company/company.service';
import { CompanyStructureService } from 'src/company_structure/company_structure.service';

@Injectable()
export class DetailCompanyStructureService {
  constructor(@InjectRepository(DetailCompanyStructure) private readonly detailStructureRepo:Repository<DetailCompanyStructure>, private readonly companyService:CompanyService, private readonly companyStructureService:CompanyStructureService){}
 
 
 async create(createDetailCompanyStructureInput: CreateDetailCompanyStructureInput): Promise<DetailCompanyStructure | undefined> {
    //Check If Detail Company Exist Per Company
    const detail_company_structure_exist = await this.findByDetailStructure(createDetailCompanyStructureInput.detail_company_structure, createDetailCompanyStructureInput.company_id);
    if(detail_company_structure_exist) throw new HttpException("This Detail Company Structure Already Created In This Company",HttpStatus.CONFLICT);
    //If Not Exist Create New Detail Company Structure
    const newCompanyStructure = this.detailStructureRepo.create(createDetailCompanyStructureInput);
    const createdCompanyStructure = await this.detailStructureRepo.save(newCompanyStructure);
    //Check If Creation Was Successfull Else Throw Error
    if(createDetailCompanyStructureInput) return createdCompanyStructure;

    throw new HttpException("Could Not Insert Successful Into Database", HttpStatus.INTERNAL_SERVER_ERROR);

  }

  findAll(company_id:string): Promise<DetailCompanyStructure[]> {
    return this.detailStructureRepo.find({where:{company_id}});
  }

  findByDetailStructure(detail_company_structure:string, company_id:string){
    return this.detailStructureRepo.findOne({where:{detail_company_structure, company_id}});
  }

  findOne(id: string): Promise<DetailCompanyStructure> {
    return this.detailStructureRepo.findOne({where:{id}});
  }

  findOneHigher(id:string): Promise<DetailCompanyStructure>{
    //return this.detailStructureRepo.findOne({where:{id}});

    return this.detailStructureRepo.createQueryBuilder('detail_company_structures')
                            .leftJoinAndSelect('detail_company_structures','detail_company_structure', "detail_company_structures.higher_structure_id = detail_company_structures.id")
                            .where("detail_company_structures.id = :higher_structure_id",{higher_structure_id:id})
                            .getOne()
  }

  async update(id: string, updateDetailCompanyStructureInput: UpdateDetailCompanyStructureInput): Promise<DetailCompanyStructure | undefined> {
    //Check If  Detail Company Structure Exist In Another Table 
    const detail_company_structure_exist = await this.detailStructureRepo.findOne({where:{detail_company_structure:updateDetailCompanyStructureInput.detail_company_structure, company_id:updateDetailCompanyStructureInput.company_id,id:Not(id)}});
    if(detail_company_structure_exist) throw new HttpException("This Detail Company Structure Already Exist", HttpStatus.CONFLICT);
    //Update Detail Company Structure
    const updateDetailStructure = await this.detailStructureRepo.update(id, updateDetailCompanyStructureInput);
    if(updateDetailStructure) return await this.findOne(id);
    throw new HttpException("This Detail Company Structure Could Not Be Update Successfully", HttpStatus.CONFLICT);
  
  }

  async remove(id: string) {
    const detail_structure = await this.findOne(id);
    if(!detail_structure) throw new HttpException("ID Not Found", HttpStatus.NOT_FOUND);
     const delDetailStructure = await this.detailStructureRepo.delete(id)
     if(delDetailStructure) return detail_structure
     throw new HttpException("Delete Unsuccessful", HttpStatus.INTERNAL_SERVER_ERROR);
  }


  async getCompany(id:string){
    return this.companyService.findOne(id);
  }

  async getStructure(id:string){
    return this.companyStructureService.findOne(id);
  }

  async forCountry(id:number){
    return this.detailStructureRepo.find({where:{country_id: id}})
  }


  async forState(id:number){
    return this.detailStructureRepo.find({where:{state_id: id}})
  }
}
