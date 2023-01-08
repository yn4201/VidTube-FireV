import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InteractService {
  isCheck: boolean = true;
  callbacks: any[] = []
  constructor() {
  }
  turnMenu() {
    this.isCheck = !this.isCheck
    this.callbacks.forEach((callback) => {
      callback(this.isCheck)
    })
  }

  listenToggleMenu(callback: (value: any) => void): void {
    this.callbacks.push(callback)
  }


}
