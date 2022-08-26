import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Like } from '../models/like.model';
import Post from '../models/Post';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class LikeService  {
  postUrl: string = `${environment.baseUrl}/like`
  constructor(private http: HttpClient) { }

  public getLike():Observable<Like[]> {
    return this.http.get<Like[]>(`${this.postUrl}/like/all`)
  }
  public addLike(user:User, post:Post):Observable<Like> {
    let like = new Like(0, user, post);
    return this.http.post<Like>(`${this.postUrl}/like/add`,like, {headers: environment.headers, withCredentials: environment.withCredentials} )
  }
  public deleteLike(id:number):Observable<Like> {
    return this.http.delete<Like>(`${this.postUrl}/like/remove`)
  }
}
