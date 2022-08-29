import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BookmarkService } from './bookmark.service';
import User from '../models/User';
import { environment } from 'src/environments/environment';
import Bookmark from '../models/Bookmark';

const user = new User(5,"testuser@gmail.com",'Test','User','','','','','','',8,'password')
const expectedUrl = `${environment.baseUrl}/bookmarks`
const dateNow = new Date();
const testPost ={
  "id": 10001,
  "text": "Lorem ipsum",
  "imageUrl": "",
  "date": dateNow,
  "comments": [],
  "author": user
}
const testBookmark:Bookmark ={
  "id": 1,
  "post": testPost,
  "user": user
}
const testBookmarkArray: Bookmark[] = [testBookmark];

describe('BookmarkService', () => {
  let service: BookmarkService;
  let controller: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({imports:[HttpClientTestingModule],
      providers: [BookmarkService]
    });
    service = TestBed.inject(BookmarkService);

    controller = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('gets a list of bookmarks using the current user ', () => {
    let actualList: Bookmark[] | undefined;
    service.getAllSavedPosts(user).subscribe((otherList) => {
      actualList=otherList
    } )

    const request = controller.expectOne(`${expectedUrl}/${user.id}`);

    request.flush(testBookmarkArray)

    expect(actualList).toEqual(testBookmarkArray)

    controller.verify();
  })

  it('makes a new bookmark for a given user and post', () => {
    let actualBookmark: Bookmark | undefined;

    service.bookmarkPost(user, testPost).subscribe((otherMark) => {
      actualBookmark=otherMark
    } )

    const request = controller.expectOne(`${expectedUrl}`);

    request.flush(testBookmark)

    expect(actualBookmark).toEqual(testBookmark)

    controller.verify();
  })

  it('deletes a bookmark, given a bookmark', () => {

    service.deleteBookmark(testBookmark).subscribe()

    const request = controller.expectOne(`${expectedUrl}`);
    request.flush({status: 200})

    expect(request.request.method).toEqual('DELETE')

    controller.verify();
  })

});
