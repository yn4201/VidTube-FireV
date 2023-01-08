import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.schema';
import { forwardRef } from '@nestjs/common';
import { VideoSchema } from 'src/models/video.schema';
import { VideoModule } from 'src/video/video.module';
@Module({
  imports: [
    
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema}],'youtube-clone'),
    MongooseModule.forFeature([{ name: 'video', schema: VideoSchema }],'youtube-clone'),    
    forwardRef(() => VideoModule),
   
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
