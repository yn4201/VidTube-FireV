import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  HttpException,
  HttpStatus,
  Req,
  Res,
  StreamableFile,
  Query,
  Put,
  Headers
} from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import type { Request, Response } from 'express';
import { createReadStream, close } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { AuthService } from 'src/auth/auth.service';
import { Video } from 'src/models/video.schema';
import { SuggestionService } from 'src/suggestion/suggestion.service';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService, private authService: AuthService, private suggestionService: SuggestionService) { }

  // @Post('upload/thumb')
  // @UseInterceptors(FileInterceptor('thumbnail',
  //   {
  //     storage: diskStorage({
  //       destination: './uploads/images',
  //       filename: (req, file, callback) => {
  //         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  //         const ext = extname(file.originalname);
  //         const filename = `${uniqueSuffix}${ext}`;
  //         callback(null, filename);
  //       }
  //     })
  //   }
  // ))
  // async uploadThumbFile(@UploadedFile() file: Express.Multer.File) {
  //   if (file) {
  //     // console.log(file);
  //     return file;
  //   } else {
  //     throw new HttpException('File is empty', HttpStatus.BAD_REQUEST);
  //   }
  // }

  @Post('upload/vid')
  @UseInterceptors(FileInterceptor('video',
    {
      storage: diskStorage({
        destination: './uploads/videos',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        }
      })
    }
  ))
  uploadVideoFile(@UploadedFile() file: Express.Multer.File) {
    if (file) {
      // console.log(file);
      return file;
    } else {
      throw new HttpException('File is empty', HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  async addVideo(@Body() video: Video, @Req() req: any) {
    return await this.videoService.createVideoInfo(video, req.user);
  }

  @Get('all/vid')
  getVideoFile(@Query('path') path: any) {

    const file = createReadStream(join(process.cwd(), path));
    console.log(`video was played in this "${file.path}" path`);
    return new StreamableFile(file);
  }

  @Get('all')
  getAllVideosInfo() {
    return this.videoService.findAllVideoInfo();
  }

  

  // @Get('all/user')
  // async getAllVideosInfoExceptUser(@Headers('Authorization') idToken: string) {
  //   let verifiedToken = await this.authService.verifyToken(idToken);
  //   // return verifiedToken;
  //   return this.videoService.findAllVideoInfoExceptUser(verifiedToken);
  // }

  @Get('all/user')
  async getAllVideosInfoOftUser(@Req() req: any) {
    // let verifiedToken = await this.authService.verifyToken(idToken);
    // return verifiedToken;
    console.log(`user with email: ${req.user.email} was just go to their channel`)
    return this.videoService.findAllVideoInfosForUser(req.user);
  }


  @Get('one/:id')
  getOneVideoInfo(@Param('id') id: string) {
    return this.videoService.findOneVideoInfo(id);
  }

  @Get('entire/:id')
  getEntireVideoInfo(@Param('id') id: string) {
    return this.videoService.findEntireVideoInfo(id);
  }

  @Put('views/:id')
  updateViews(@Param('id') id: string) {
    console.log(`video with id${id} was counted +1 view`);
    return this.videoService.countView(id);
  }

  @Put('like/:id')
  likeVideo(@Param('id') id: string, @Req() req: any) {
    console.log(`video with id ${id} was liked by this ${req.user.email} user`);
    return this.videoService.likeVideo(id, req.user.email);
  }

  @Put('unlike/:id')
  unlikeVideo(@Param('id') id: string, @Req() req: any) {
    console.log(`video with id ${id} was unliked by this ${req.user.email} user`);
    return this.videoService.unlikeVideo(id, req.user.email);
  }

  @Put('dislike/:id')
  dislikeVideo(@Param('id') id: string, @Req() req: any) {
    console.log(`video with id ${id} was disliked by this ${req.user.email} user`);
    return this.videoService.dislikeVideo(id, req.user.email);
  }

  @Put('undislike/:id')
  undislikeVideo(@Param('id') id: string, @Req() req: any) {
    console.log(`video with id ${id} was undisliked by this ${req.user.email} user`);
    return this.videoService.undislikeVideo(id, req.user.email);
  }


  @Delete()
  async deleteVideo(@Query('id') id:string,@Query('path') path:string){
    return await this.videoService.deleteVideo(id,path);
  }


  // @Post('upload/video')
  // @UseInterceptors(FileFieldsInterceptor(
  //   [
  //     { name: 'thumbnail', maxCount: 1 },
  //     { name: 'video', maxCount: 1 }
  //   ],
  //   {
  //     storage: diskStorage({
  //       destination: './uploads/videos',
  //       filename: (req, file, callback) => {
  //         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  //         const ext = extname(file.originalname);
  //         const filename = `${uniqueSuffix}${ext}`;
  //         callback(null, filename);
  //       }
  //     })
  //   }
  // ))
  // uploadVideoFile(@UploadedFiles() files: { thumbnail?: Express.Multer.File[], video?: Express.Multer.File[] }) {
  //   if (files) {
  //     console.log(files);
  //     return files;
  //   } else {
  //     throw new HttpException('Files is empty', HttpStatus.BAD_REQUEST);
  //   }
  // }

}
