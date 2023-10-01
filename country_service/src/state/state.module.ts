import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateResolver } from './state.resolver';
import { State } from './entities/state.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryModule } from 'src/country/country.module';

@Module({
  imports:[TypeOrmModule.forFeature([State]), CountryModule],
  providers: [StateResolver, StateService],
})
export class StateModule {}
