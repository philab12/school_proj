import { Module } from '@nestjs/common';
import { SchoolResolver } from './school.resolver';
import { LevelModule } from 'src/level/level.module';

@Module({
  imports: [LevelModule],
  providers: [SchoolResolver]
})
export class SchoolModule {}
