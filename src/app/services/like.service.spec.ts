import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Like } from '../models/like.model';
import User from '../models/User';

import { LikeService } from './like.service';

const user = new User(5,"testuser@gmail.com",'Test','User','','','','','','',8,'password')
const expectedUrl = `${environment.baseUrl}/liked`
const dateNow = new Date();
const testPost ={
  "id": 10001,
  "text": "Lorem ipsum",
  "imageUrl": "",
  "date": dateNow,
  "comments": [],
  "author": user
}
const testLike:Like ={
  "id": 1,
  "post": testPost,
  "user": user
}
const testLikeArray: Like[] = [testLike];

describe('LikeService', () => {
  let service: LikeService;
  let controller: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [LikeService]
    });
    service = TestBed.inject(LikeService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a list of likes given a post id', () => {
    let actualList: Like[] | undefined;
    service.getLike(testPost.id).subscribe((otherList) => {
      actualList=otherList
    } )

    const request = controller.expectOne(`${expectedUrl}/${testPost.id}`);

    request.flush(testLikeArray)

    expect(actualList).toEqual(testLikeArray)

    controller.verify();
  })

  it('should add a like', () => {
    let actualLike:Like | undefined

    service.addLike(testLike).subscribe((otherLike) => {
      actualLike=otherLike
    } )

    const request = controller.expectOne(`${expectedUrl}/add`);

    request.flush(testLike)

    expect(actualLike).toEqual(testLike)

    controller.verify();
  })

  it('should delete a like', () => {
    let actualLike:Like | undefined

    service.deleteLike(testLike).subscribe((otherLike) => {
      actualLike=otherLike
    } )

    const request = controller.expectOne(`${expectedUrl}/remove`);

    request.flush(testLike)

    expect(actualLike).toEqual(testLike)

    controller.verify();
  })
});
