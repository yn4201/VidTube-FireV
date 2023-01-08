import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoSchema } from 'src/models/video.schema';
import { AuthService } from 'src/auth/auth.service';
import { UserModule } from 'src/user/user.module';
import { forwardRef } from '@nestjs/common';
import { UserSchema } from 'src/models/user.schema';
import { SuggestionModule } from 'src/suggestion/suggestion.module';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'video', schema: VideoSchema }],'youtube-clone'),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }],'youtube-clone'),    
    forwardRef(() => UserModule),
    forwardRef(() => SuggestionModule),
    forwardRef(() => CommentModule),
  ],
  controllers: [VideoController],
  providers: [VideoService,AuthService],
  exports: [VideoService]
})
export class VideoModule {}
