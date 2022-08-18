import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

    subject = new Subject()
  constructor() { }

  sendMsg(bookmark:any){
    this.subject.next(bookmark)
  }

  getMsg(){
    return this.subject.asObservable()
  }

}
