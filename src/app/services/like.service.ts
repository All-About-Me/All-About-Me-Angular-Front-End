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
  postUrl: string = `${environment.baseUrl}`
  constructor(private http: HttpClient) { }

  public getLike(id:number):Observable<Like[]> {
    return this.http.get<Like[]>(`${this.postUrl}/liked/${id}`)
  }
  public addLike(like:Like):Observable<Like> {
    return this.http.post<Like>(`${this.postUrl}/liked/add`,like, {headers: environment.headers, withCredentials: environment.withCredentials} )
  }
  public deleteLike(like:Like):Observable<Like> {
    return this.http.delete<Like>(`${this.postUrl}/liked/remove`, {body: like, headers: environment.headers, withCredentials: environment.withCredentials} )
  }
}
