import { Test, TestingModule } from '@nestjs/testing';
import { CompanyStructureResolver } from './company_structure.resolver';
import { CompanyStructureService } from './company_structure.service';

describe('CompanyStructureResolver', () => {
  let resolver: CompanyStructureResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyStructureResolver, CompanyStructureService],
    }).compile();

    resolver = module.get<CompanyStructureResolver>(CompanyStructureResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
