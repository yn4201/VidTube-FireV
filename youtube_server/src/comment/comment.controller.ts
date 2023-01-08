import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { Comment } from 'src/models/comment.schema';
import { CommentService } from './comment.service';


@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

 @Post('video/:id')
 async commentVideo(@Param('id') videoId: string,@Body() comment: Comment, @Req() req: any){
  console.log(`video with id ${videoId} was comment by ${req.user.email} acount`);
  return await this.commentService.createComment(comment,req.user.email,videoId);
 }

 @Get('all/:id')
 async getAllCommentWithVideoId(@Param('id') videoId: string){
  return await this.commentService.getAllCommentsFromVideo(videoId);
 }
}
