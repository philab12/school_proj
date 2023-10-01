import { Test, TestingModule } from '@nestjs/testing';
import { CompanyStructureService } from './company_structure.service';

describe('CompanyStructureService', () => {
  let service: CompanyStructureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyStructureService],
    }).compile();

    service = module.get<CompanyStructureService>(CompanyStructureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
