import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import Like from '../models/Like';
import User from '../models/User';

import { LikeService } from './like.service';

const user = new User(5,"testuser@gmail.com",'Test','User','','','','','','',8,'password')
const expectedUrl = `${environment.baseUrl}/like`
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

  it('should get a list of likes given a post', () => {
    let actualList: Like[] | undefined;
    service.getAllLikesForPost(testPost).subscribe((otherList) => {
      actualList=otherList
    } )

    const request = controller.expectOne(`${expectedUrl}/post/${testPost.id}`);

    request.flush(testLikeArray)

    expect(actualList).toEqual(testLikeArray)

    controller.verify();
  })

  it('should get a list of likes given a user', fakeAsync(() => {
    let actualList: Like[] | undefined;

    service.getAllMyLikes(user)

    const request = controller.expectOne(`${expectedUrl}/user/${user.id}`);

    request.flush(testLikeArray)

    tick()
    expect(service.likesForUser).toEqual(testLikeArray)

    controller.verify();
  }))

  it('should add a like', () => {
    let actualLike:Like | undefined

    service.likePost(user,testPost).subscribe((otherLike) => {
      actualLike=otherLike
    } )

    const request = controller.expectOne(`${expectedUrl}`);

    request.flush(testLike)

    expect(actualLike).toEqual(testLike)

    controller.verify();
  })

  it('should delete a like', () => {
    let actualLike:any

    service.unLike(testLike).subscribe((otherLike) => {
      actualLike=otherLike
    } )

    const request = controller.expectOne(`${expectedUrl}`);

    request.flush(testLike)

    expect(actualLike).toEqual(testLike)

    controller.verify();
  })
});
