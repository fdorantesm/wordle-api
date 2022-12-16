import { Test, TestingModule } from '@nestjs/testing';

import { UuidApikeyGeneratorService } from './uuid-apikey-generator.service';

describe('UuidApikeyGeneratorService', () => {
  let service: UuidApikeyGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UuidApikeyGeneratorService],
    }).compile();

    service = module.get<UuidApikeyGeneratorService>(
      UuidApikeyGeneratorService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
