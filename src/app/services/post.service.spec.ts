import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import Post from '../models/Post';
import User from '../models/User';

import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('TestBed should be Truthy', () => {
    expect(TestBed).toBeTruthy();
  });
  it('should get all posts', () =>{
    const user = new User(5,"testuser@gmail.com",'Test','User','','','','','','',8,'password')
const expectedUrl = `${environment.baseUrl}/post`
const dateNow = new Date();
    const testPost: Post[] =[{"id": 10001,"text": "Lorem ipsum","imageUrl": "","date": dateNow, "comments": [],"author": user  },
                      {"id": 10002,"text": "Lorem ipsum","imageUrl": "","date": dateNow, "comments": [],"author": user  },
                      {"id": 10003,"text": "Lorem ipsum","imageUrl": "","date": dateNow, "comments": [],"author": user  }];
    service.getAllPosts().subscribe(posts=>{
      expect(posts.length).toBe(3);
      expect(posts).toEqual(testPost);
    });

    const req = controller.expectOne(`${service.postUrl}`);
    expect(req.request.method).toBe('GET');

    req.flush(testPost);
  })
});
