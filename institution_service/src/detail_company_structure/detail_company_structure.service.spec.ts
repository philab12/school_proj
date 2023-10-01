import { Test, TestingModule } from '@nestjs/testing';
import { DetailCompanyStructureService } from './detail_company_structure.service';

describe('DetailCompanyStructureService', () => {
  let service: DetailCompanyStructureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailCompanyStructureService],
    }).compile();

    service = module.get<DetailCompanyStructureService>(DetailCompanyStructureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
