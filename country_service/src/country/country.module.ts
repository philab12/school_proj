import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryResolver } from './country.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Country])],
  providers: [CountryResolver, CountryService],
  exports:[CountryService]
})
export class CountryModule {}
