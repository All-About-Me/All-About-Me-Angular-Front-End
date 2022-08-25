import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class FollowerService {

  baseUrl: string = `${environment.baseUrl}/follower`;
  constructor(private http:HttpClient) { }

  addFollow(user:User, follow:User){
    return this.http.post<User>(this.baseUrl+"/"+user.id+"/add", follow);
  }

  getFollows(user:User):Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl+"/"+user.id);
  }

  unfollow(user:User, follow:User){
    console.log(this.baseUrl+"/"+user.id+"/"+follow.id);
    return this.http.delete<User>(this.baseUrl+"/"+user.id+"/"+follow.id);
  }
}
