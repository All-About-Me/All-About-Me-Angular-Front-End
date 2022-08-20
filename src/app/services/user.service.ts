import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = `${environment.baseUrl}/user`;
  currentUser: User;

  constructor(private http:HttpClient) { }

  updateUser(user:User):Observable<any>{
    return this.http.put<User>(this.baseUrl+"/update", user, {headers: environment.headers, withCredentials: environment.withCredentials})
  }

  getUserById(id:number):Observable<User>{
    console.log(this.baseUrl+"/"+id);
    return this.http.get<User>(this.baseUrl+"/"+id)
  }
}
