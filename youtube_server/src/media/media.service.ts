import { Injectable } from '@nestjs/common';
import { mkdir, mkdirSync, rmdirSync, renameSync, unlinkSync, } from 'fs';
const ffmpeg = require('fluent-ffmpeg');
@Injectable()

export class MediaService {

  constructor() { }

  cutVideo(file: Express.Multer.File) {
    // ffmpeg.ffprobe(file.path,(data,err) => {
    //   if(err){
    //     console.log(err);
    //   }else{
    //     console.log(data.format.duration);
    //   }
    // })
    return new Promise<Express.Multer.File>((resolve, rejects) => {
      mkdirSync(`./uploads/vids/cvt/${file.filename}-conv`);
      renameSync(`./uploads/vids/${file.filename}`, `./uploads/vids/cvt/${file.filename}-conv/${file.filename}`);
      ffmpeg()
        .addInput(`./uploads/vids/cvt/${file.filename}-conv/${file.filename}`)
        .output(`./uploads/vids/cvt/${file.filename}-conv/main.m3u8`)
        .outputOptions([
          // '-g 60',
          '-f hls',
          '-max_muxing_queue_size 1024',
          '-hls_time 2',
          '-hls_list_size 0',
          '-hls_segment_size 500000',
          '-hls_segment_filename', `./uploads/vids/cvt/${file.filename}-conv/fileSequence%d.section`
        ])
        .on('start', function (commandLine) {
          console.log('Spawned Ffmpeg with command: ' + commandLine);
        })
        .on('error', function (err, stdout, stderr) {
          console.log('An error occurred: ' + err.message, err, stderr);
          rejects(err);
        })
        .on('progress', function (progress) {
          console.log('Processing: ' + progress.percent + '% done')
        })
        .on('end', async function () {
          console.log('Finished processing');
         
          unlinkSync(`./uploads/vids/cvt/${file.filename}-conv/${file.filename}`);
          resolve(file);
        })
        .run();
    });
  }

  // async cutThumbFromVid(file: Express.Multer.File) {
  //   try {
  //     let options = { width: 100, height: 100, responseType: 'base64', jpegOptions: { force:true, quality:90 } }
  //     const thumbnail = await imageThumbnail(file.path,options);
  //     console.log(thumbnail);
  //     return thumbnail;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
}
