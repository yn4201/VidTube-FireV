import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { HttpService } from 'src/app/services/http.service';
import { UploadService } from 'src/app/services/upload.service';
import { AuthState } from 'src/app/states/auth.state';
import { VideoState } from 'src/app/states/video.state';
import * as VideoActions from '../../../../../actions/video.action';
import {
  generateVideoThumbnails,
} from "@rajesh896/video-thumbnails-generator";
import { Video } from 'src/app/models/video.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {


  isEmpty: boolean = true;

  isvideoInfoCreate$ = this.store.select((state) => state.video);

  videoFiles: File[] = [];
  imageFiles: File[] = [];
  testImageFiles: string[] = [];

  idToken$ = this.store.select((state) => state.auth.idToken);
  token: string = "";
  videoUploadForm !: FormGroup;
  showSpinner = false;
  // rejectedFiles: RejectedFile[] = [];

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    // private authService: AuthService,
    private uploadService: UploadService,
    // private auth: Auth,
    private store: Store<{ video: VideoState, auth: AuthState }>
  ) {


    this.idToken$.subscribe((token) => {
      this.token = token;
      // console.log(this.token);
    })

    this.isvideoInfoCreate$.subscribe(value => {
      if (value.isSuccess == true) {
        this.store.dispatch(VideoActions.uploadVideo({ idToken: this.token, videoFile: this.videoFiles[0] , video_id: value.videoLoad._id}))
        setTimeout(()=>{
          this.showSpinner = false;
          this._snackBar.open("Upload is processing,", "close", {
            duration: 3000,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
          });
          this.resetForm();
        },45000);
      } 
    })
  }

  ngOnInit(): void {

    this.videoUploadForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      hashtags: [''],
    });
  }

  resetForm() {
    this.videoUploadForm.reset(this.videoUploadForm);
    this.videoFiles.length = 0;
    this.imageFiles.length = 0;
    this.testImageFiles.length = 0;
  }

  async add() {
    // const videoFormData: FormData = new FormData();
    // const thumbFormData: FormData = new FormData();
    if (this.videoFiles[0] && this.imageFiles[0]) {
      this.showSpinner = true;
      let thumbUrl = await this.uploadService.uploadImage(this.imageFiles[0]);
      let hashtags = [];
      // let videoPath = value;
      // videoFormData.append('video', this.videoFiles[0]);
      // let videoPath = await this.httpService.addVideo(this.token, videoFormData);
      // thumbFormData.append('thumbnail', this.imageFiles[0]);
      // let imagePath = await this.httpService.addThumb(this.token, thumbFormData);

      let form = this.videoUploadForm.value;
      let description = form.description.replace(/\n/g, "<br>");
      // console.log(description);

      if (form.hashtags) {
        // console.log(form.hashtags);
        hashtags = form.hashtags.trim();
        hashtags = hashtags.split(" ");
        // console.log(hashtags);
      }

      let newForm : Video = {
        ...form,
        description: description,
        // url: videoPath,
        photoURL: thumbUrl,
        hashtags: hashtags,
        isHidden: true,
      }

      // console.log(newForm);
      // let video = await this.httpService.createVideoInfo(this.token, newForm);
      // console.log(video);\
      this.store.dispatch(VideoActions.createVideoInfo({ idToken: this.token, video: newForm }))
      
    } else {
      alert('Files are emptied');
      return
    }
  }


  onVideoSelect(event: { addedFiles: any; rejectedFiles: any }) {
    // console.log(event);
    this.isEmpty = true;
    if (event.addedFiles.length > 0) {
      if (this.videoFiles.length > 0) {
        this.videoFiles.shift();
        // console.log(this.videoFiles);
      }
      this.videoFiles.push(...event.addedFiles);
      this.convertThumb();
      // console.log(this.videoFiles);
    } else {
      // this.rejectedFiles.push(...event.rejectedFiles);
      // console.log(this.rejectedFiles);
      alert(`Your uploading file is reject due to: ${event.rejectedFiles[0].reason}`);
    }
  }

  onVideoRemove(event: File) {
    console.log(event);
    this.testImageFiles.length = 0;
    this.videoFiles.splice(this.videoFiles.indexOf(event), 1);
  }

  onImageSelect(event: { addedFiles: any; rejectedFiles: any }) {
    // console.log(event);
    if (event.addedFiles.length > 0) {
      if (this.imageFiles.length > 0) {
        this.imageFiles.shift();
        console.log(this.imageFiles);
      }
      this.imageFiles.push(...event.addedFiles);
      // console.log(this.imageFiles);
    } else {
      // this.rejectedFiles.push(...event.rejectedFiles);
      // console.log(this.rejectedFiles);
      alert(`Your uploading file is reject due to: ${event.rejectedFiles[0].reason}`);
    }
  }

  onImageRemove(event: File) {
    console.log(event);
    this.imageFiles.splice(this.imageFiles.indexOf(event), 1);
  }

  convertThumb() {
    let videoFile = this.videoFiles[0];
    generateVideoThumbnails(videoFile, 2, 'jpg').then((thumbnailArray: string[]) => {
      // output will be arry of base64 Images
      // example - ["img1", "imgN"]

      // let convertedFiles = thumbnailArray.map((fileBase64, index) => {
      //   let fileType = fileBase64.substring(
      //     fileBase64.indexOf(":") + 1,
      //     fileBase64.lastIndexOf(";")
      //   );
      //   console.log(fileType)
      //   let fileExtension = fileType.split('/');
      //   return new File([fileBase64], `thumb${index}.${fileExtension[1]}`, {type: fileType});
      // });
      // console.log(convertedFiles);
      // console.log(thumbnailArray);

      this.testImageFiles = thumbnailArray;
      this.isEmpty = false;
      return thumbnailArray;
      // @todo - implement your logic here
    }).catch((err: any) => {
      console.error(err);
    })

  }



  //***************************** 
  // @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef | undefined;
  // files: any[] = [];
  // onFileDropped($event: any) {
  //   this.prepareFilesList($event);
  // }

  // /**
  //  * handle video file from browsing
  //  */
  // videoFileBrowseHandler(files: any) {
  //   if (files.files[0].type == 'image/jpeg' || files.files[0].type == 'image/png' || files.files[0].type == 'image/jpg' || files.files[0].type == 'image/svg' || files.files[0].type == 'image/gif') {
  //     console.log(0)
  //   }
  //   this.prepareFilesList(files.files);
  //   console.log(this.files)
  // }

  //  /**
  //  * handle image file from browsing
  //  */
  //  imageFileBrowseHandler(files: any) {
  //     if (files.files[0].type == 'image/jpeg' || files.files[0].type == 'image/png' || files.files[0].type == 'image/jpg' || files.files[0].type == 'image/svg' || files.files[0].type == 'image/gif') {
  //       console.log(0)
  //     }
  //     this.prepareFilesList(files.files);
  //     console.log(this.files)
  //   }

  // /**
  //  * Delete file from files list
  //  * @param index (File index)
  //  */
  // deleteFile(index: number) {
  //   if (this.files[index].progress < 100) {
  //     console.log("Upload in progress.");
  //     return;
  //   }
  //   this.files.splice(index, 1);
  // }

  // /**
  //  * Simulate the upload process
  //  */
  // uploadFilesSimulator(index: number) {
  //   setTimeout(() => {
  //     if (index === this.files.length) {
  //       return;
  //     } else {
  //       const progressInterval = setInterval(() => {
  //         if (this.files[index].progress === 100) {
  //           clearInterval(progressInterval);
  //           this.uploadFilesSimulator(index + 1);
  //         } else {
  //           this.files[index].progress += 5;
  //         }
  //       }, 200);
  //     }
  //   }, 1000);
  // }

  // /**
  //  * Convert Files list to normal array list
  //  * @param files (Files List)
  //  */
  // prepareFilesList(files: Array<any>) {
  //   for (const item of files) {
  //     item.progress = 0;
  //     if (this.files.length > 0) {
  //       this.files.shift();
  //     }
  //     this.files.push(item);
  //   }
  //   this.fileDropEl!.nativeElement.value = "";
  //   this.uploadFilesSimulator(0);
  // }

  // /**
  //  * format bytes
  //  * @param bytes (File size in bytes)
  //  * @param decimals (Decimals point)
  //  */
  // formatBytes(bytes: any, decimals = 2) {
  //   if (bytes === 0) {
  //     return "0 Bytes";
  //   }
  //   const k = 1024;
  //   const dm = decimals <= 0 ? 0 : decimals;
  //   const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  // }
}
