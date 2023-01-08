import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from 'src/models/comment.schema';
import { UserSchema } from 'src/models/user.schema';
import { UserModule } from 'src/user/user.module';
import { forwardRef } from '@nestjs/common';
import { VideoSchema } from 'src/models/video.schema';
import { VideoModule } from 'src/video/video.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'comment', schema: CommentSchema }],'youtube-clone'),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema}],'youtube-clone'),
    MongooseModule.forFeature([{ name: 'video', schema: VideoSchema}],'youtube-clone'),
    forwardRef(() => UserModule),
    forwardRef(() => VideoModule),
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService]
})
export class CommentModule {}
