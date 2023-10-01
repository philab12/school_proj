import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStateInput } from './dto/create-state.input';
import { UpdateStateInput } from './dto/update-state.input';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from './entities/state.entity';
import { Not, Repository } from 'typeorm';
import { CountryService } from 'src/country/country.service';
import { Country } from 'src/country/entities/country.entity';

@Injectable()
export class StateService {
  constructor(@InjectRepository(State) private readonly stateRepo:Repository<State>, private readonly countryService:CountryService){}

  async create(createStateInput: CreateStateInput): Promise<State> {
    //Check If State Already Exist
    const state_exist = await this.findByState(createStateInput.state);
    if(state_exist) throw new HttpException("This State Already Exist", HttpStatus.CONFLICT);
    //If State Does Not Exist Create A New State
    const newState = this.stateRepo.create(createStateInput);
    const createState = await this.stateRepo.save(newState)
    if(createState) return createState
    throw new HttpException("State Could Not Be Created", HttpStatus.CONFLICT);
  }

  async findAll(): Promise<State[]> {
    return this.stateRepo.find();
  }

  async findByState(state:string): Promise<State>{
    return this.stateRepo.findOne({where:{state}})
  }

  async findOne(id: number): Promise<State> {
    return this.stateRepo.findOne({where:{id}});
  }

  async update(id: number, updateStateInput: UpdateStateInput): Promise<State> {
    //Check If State Already Exist In A Different Field
    const state_exist = await this.stateRepo.findOne({where:{state:updateStateInput.state, id:Not(id)}})
    if(state_exist) throw new HttpException("This State Already Exist", HttpStatus.CONFLICT)
    //Update State
  const update_state = await this.stateRepo.update(id, updateStateInput);
  if(update_state) return await this.findOne(id);
  throw new HttpException("This State Could NOt Be Updated", HttpStatus.INTERNAL_SERVER_ERROR);
    
  }

  async remove(id: number): Promise<State> {
    const id_exist = await this.findOne(id)
    if(!id_exist) throw new HttpException("This ID Not Found", HttpStatus.NOT_FOUND);
    const delState = await this.stateRepo.delete(id);
    if(delState) return id_exist;
    throw new HttpException("This State Could Not Be Deleted", HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async getCountry(id: number):Promise<Country>{
    return this.countryService.findOne(id);
  }
}
