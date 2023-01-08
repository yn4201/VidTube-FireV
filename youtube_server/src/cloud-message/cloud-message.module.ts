import { Module } from '@nestjs/common';
import { CloudMessageService } from './cloud-message.service';
import { CloudMessageController } from './cloud-message.controller';

@Module({
  controllers: [CloudMessageController],
  providers: [CloudMessageService]
})
export class CloudMessageModule {}
