import {
  Controller, Post, Req, Res, UseInterceptors, UploadedFile, HttpException, HttpStatus, Param
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SuggestionService } from 'src/suggestion/suggestion.service';
import { VideoService } from 'src/video/video.service';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(public mediaService: MediaService,public videoService : VideoService, public suggestionService :SuggestionService) { }

  // @Post('test')
  // test() {
  //   return this.mediaService.cutAudio('123');
  // }

  @Post(':id')
  @UseInterceptors(FileInterceptor('video',
    {
      storage: diskStorage({
        destination: './uploads/vids',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          cb(null, filename);
        }
      })
    })
  )
  async create(@UploadedFile() file: Express.Multer.File, @Param('id') video_id: string) {
 
    if (file) {
      console.log('start convert video to m3u8');
      let file_inf = await this.mediaService.cutVideo(file);
      if(file_inf.filename){
        await this.suggestionService.updateSuggestStatus(video_id);
        return await this.videoService.updateVideoInfoWithUrl(video_id,file_inf.filename);
      }else{
        return new Object({filename:""});
      }
    } else {
      throw new HttpException('File is empty', HttpStatus.BAD_REQUEST);
    }
  }

  // @Post('thumb')
  // @UseInterceptors(FileInterceptor('image',
  //   {
  //     storage: diskStorage({
  //       destination: './uploads/images',
  //       filename: (req, file, cb) => {
  //         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  //         const ext = extname(file.originalname);
  //         const filename = `${uniqueSuffix}${ext}`;
  //         cb(null, filename);
  //       }
  //     })
  //   })
  // )
  // async cutThumb(@UploadedFile() file: Express.Multer.File) {
  //   if (file) {
  //     return await this.mediaService.cutThumbFromVid(file);
  //   } else {
  //     throw new HttpException('File is empty', HttpStatus.BAD_REQUEST);
  //   }
  // }
}
