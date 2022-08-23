import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Like from '../models/Like';
import Post from '../models/Post';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  postUrl: string = `${environment.baseUrl}/like`
  likesForUser:Like[];
  constructor(private http: HttpClient) { }

  likePost(user:User,post:Post):Observable<Like>{
    let like:Like = new Like(0,user,post);
    return this.http.post<Like>(`${this.postUrl}`,like, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  getAllMyLikes(user:User): Like[]{
    this.http.get<Like[]>(`${this.postUrl}/user/${user.id}`, {headers: environment.headers, withCredentials: environment.withCredentials}).subscribe((data) => this.likesForUser=data);
    return this.likesForUser
  }

  getAllLikesForPost(post:Post): Observable<Like[]>{
    return this.http.get<Like[]>(`${this.postUrl}/post/${post.id}`, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  unLike(like:Like): Observable<ArrayBuffer>{
    return this.http.request<ArrayBuffer>('delete', `${this.postUrl}`,{body: like, headers: environment.headers, withCredentials: environment.withCredentials});
  }
}
