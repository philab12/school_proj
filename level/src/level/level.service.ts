import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLevelInput } from './dto/create-level.input';
import { UpdateLevelInput } from './dto/update-level.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class LevelService {
  constructor(@InjectRepository(Level) private readonly levelRepo:Repository<Level>){}

  async create(createLevelInput: CreateLevelInput): Promise<Level> {
    const newLevel = this.levelRepo.create(createLevelInput);
    const insLevel = await this.levelRepo.save(newLevel);
    if(insLevel) return insLevel;

    if(!insLevel) throw new HttpException("Level Could Not Be Created", HttpStatus.INTERNAL_SERVER_ERROR);
   
  }

  async findAll(school_id:string): Promise<Level[]> {
    return this.levelRepo.find({where:{school_id}});
  }

  async findByLevel(level:string, school_id:string): Promise<Level>{
    return this.levelRepo.findOne({where:{level, school_id}});
  }

  async findOne(id: string):Promise<Level> {
    return this.levelRepo.findOne({where:{id}})
  }

  async update(id: string, updateLevelInput: UpdateLevelInput) {
    const id_exist = await this.findOne(id);
    if(!id_exist) throw new HttpException("This ID Does Not Exist", HttpStatus.NOT_FOUND);
    const level_exist= await this.levelRepo.findOne({where:{level:updateLevelInput.level, id:Not(id)}});
    if(level_exist) throw new HttpException("Level Already Exist", HttpStatus.CONFLICT);

    const updateLevel = await this.levelRepo.update(id, updateLevelInput);
    if(updateLevel) return await this.findOne(id);
    throw new HttpException("Level Update Was Not Successfull", HttpStatus.INTERNAL_SERVER_ERROR);

    }

  async remove(id: string): Promise<Level> {
    const id_exist = await this.findOne(id);
    if(!id_exist) throw new HttpException("This ID Does Not Exist", HttpStatus.NOT_FOUND);

    const delLevel = this.levelRepo.delete(id);
    if(delLevel) return id_exist
    throw new HttpException("Level Could Not Be Deleted", HttpStatus.INTERNAL_SERVER_ERROR)
    
  }

  forSchool(school_id:string): Promise<Level[]>{
    return this.levelRepo.find({where:{school_id}})
     
  }
}
