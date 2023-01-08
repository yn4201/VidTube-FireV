import { Injectable } from '@angular/core';
import Hls from 'hls.js';

@Injectable({
  providedIn: 'root'
})
export class HlsService {
  hls = new Hls();
  video!: HTMLVideoElement;


  constructor() {
    // this.changeVideoSource()
  }
  
  // changeVideoSource(){
  //   this.video.src = '../../../assets/video/BLACKPINKHowYouLikeThatMV/output.m3u8'
  //   this.hls.attachMedia(this.video)
  // }
}
