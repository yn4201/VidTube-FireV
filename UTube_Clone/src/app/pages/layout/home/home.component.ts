import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HlsService } from 'src/app/services/hls/hls.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit {
  // @ViewChild('audioControl', { static: false })
  // audioControl!: HTMLVideoElement;

  // source = 'http://127.0.0.1:5000/1662365010865-699296955.mp4/main.m3u8'

  constructor(private hlsService: HlsService) {
  }
  ngAfterViewInit(): void {
    // let audioControl = document.getElementById('video');
    // this.hlsService.hls.loadSource(this.source)
    // if(audioControl!=null){
    //   this.hlsService.hls.attachMedia(audioControl as HTMLMediaElement)
    // }
  }

  ngOnInit(): void {
  }
}
