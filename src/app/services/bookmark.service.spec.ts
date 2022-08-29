import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BookmarkService } from './bookmark.service';
import User from '../models/User';
import { environment } from 'src/environments/environment';
import Bookmark from '../models/Bookmark';

const user = new User(5,"testuser@gmail.com",'Test','User','','','','','','',8,'password')
const expectedUrl = `${environment.baseUrl}/bookmarks`
const fakeBookmark: Bookmark[] = [
  {
      "id": 1,
      "post": {
          "id": 10001,
          "text": "Lorem ipsum",
          "imageUrl": "",
          "comments": [],
          "author": {
              "id": 5,
              "email": "testuser@gmail.com",
              "password": "password",
              "firstName": "Test",
              "lastName": "User",
              "phoneNumber": '',
              "address": '',
              "gender": '',
              "aboutMe": '',
              "city": '',
              "state": '',
              "postalCode": 8
          }
      },
      "user": {
          "id": 5,
          "email": "testuser@gmail.com",
          "password": "password",
          "firstName": "Test",
          "lastName": "User",
          "phoneNumber": '',
          "address": '',
          "gender": '',
          "aboutMe": '',
          "city": '',
          "state": '',
          "postalCode": 8
      }
  }
];

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

    request.flush(fakeBookmark)

    expect(actualList).toEqual(fakeBookmark)

    controller.verify();
  })

});
