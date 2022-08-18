import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Bookmark from '../models/Bookmark';
import Post from '../models/Post';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  

  postUrl: string = `${environment.baseUrl}/bookmarks`

  constructor(private http: HttpClient) { }

  getAllSavedPosts(user:User): Observable<Bookmark[]> {
    return this.http.request<Bookmark[]>('put', `${this.postUrl}`,{body: user, headers: environment.headers, withCredentials: environment.withCredentials} )
  }

  bookmarkPost(user:User,post:Post): Observable<Bookmark> {
    let bookmark:Bookmark = new Bookmark(0, user, post)
    return this.http.post<Bookmark>(`${this.postUrl}`,bookmark, {headers: environment.headers, withCredentials: environment.withCredentials} )
  }

  deleteBookmark(bookmark:Bookmark): Observable<ArrayBuffer> {
    return this.http.request<ArrayBuffer>('delete', `${this.postUrl}`,{body: bookmark, headers: environment.headers, withCredentials: environment.withCredentials})
  }
}
