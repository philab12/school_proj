import { Test, TestingModule } from '@nestjs/testing';
import { DetailCompanyStructureResolver } from './detail_company_structure.resolver';

describe('DetailCompanyStructureResolver', () => {
  let resolver: DetailCompanyStructureResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailCompanyStructureResolver],
    }).compile();

    resolver = module.get<DetailCompanyStructureResolver>(DetailCompanyStructureResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
