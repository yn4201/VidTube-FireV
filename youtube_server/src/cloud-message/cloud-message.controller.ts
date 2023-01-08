import { Controller, Post, Body,Req } from '@nestjs/common';
import { CloudMessageService } from './cloud-message.service';

@Controller('cloud')
export class CloudMessageController {
  constructor(private readonly cloudMessageService: CloudMessageService) {}

  @Post('save')
  saveRetrieveToken(@Body() body: any,@Req() req: any){
    let temp = this.cloudMessageService.addNewRetrieveToken(req.user.email,body.reToken);
    return temp
  }
}
