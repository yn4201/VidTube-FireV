import { Test, TestingModule } from '@nestjs/testing';
import { CloudMessageController } from './cloud-message.controller';
import { CloudMessageService } from './cloud-message.service';

describe('CloudMessageController', () => {
  let controller: CloudMessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CloudMessageController],
      providers: [CloudMessageService],
    }).compile();

    controller = module.get<CloudMessageController>(CloudMessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
