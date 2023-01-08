import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from '@angular/fire/storage'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  isLoading: boolean = false;

  public async uploadImage(file: File) {
    // Create a root reference
    const storage = getStorage();
    return new Promise<string>((resolve, rejects) => {
      const n = Date.now().toString();
      // Upload file and metadata to the object 'images/mountains.jpg'
      const fileImagesRef = ref(storage, 'thumbs/' + n + '.jpg');
      const uploadTask = uploadBytesResumable(fileImagesRef, file);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              this.isLoading = false;
              console.log('Upload is paused');
              break;
            case 'running':
              this.isLoading = true;
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              resolve(error.code);
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              resolve(error.code);
              break;
            // ...
            case 'storage/unknown':
              resolve(error.code);
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log('File available at', downloadURL);
            resolve(downloadURL);
          });
        }
      );

    })
  }
}

