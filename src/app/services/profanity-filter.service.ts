import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfanityFilterService {
bannedWords:string[] = [
  "fuck",
  "shit",
  "bitch",
  "crap",
  "damn"
]
  constructor() { }

  validatePost(text:string):boolean{
    for (let i = 0; i<this.bannedWords.length; i++){
      if (text.toLowerCase().includes(this.bannedWords[i])){
        return false;
      }
    }
    return true;
  }
}
