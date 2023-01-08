import { Test, TestingModule } from '@nestjs/testing';
import { CloudMessageService } from './cloud-message.service';

describe('CloudMessageService', () => {
  let service: CloudMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudMessageService],
    }).compile();

    service = module.get<CloudMessageService>(CloudMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
