import { Test, TestingModule } from '@nestjs/testing';
import { DetailCompanyStructureResolver } from './detail_company_structure.resolver';
import { DetailCompanyStructureService } from './detail_company_structure.service';

describe('DetailCompanyStructureResolver', () => {
  let resolver: DetailCompanyStructureResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailCompanyStructureResolver, DetailCompanyStructureService],
    }).compile();

    resolver = module.get<DetailCompanyStructureResolver>(DetailCompanyStructureResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
