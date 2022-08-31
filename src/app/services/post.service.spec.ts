import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import Post from '../models/Post';
import User from '../models/User';

import { PostService } from './post.service';

const user = new User(5,"testuser@gmail.com",'Test','User','','','','','','',8,'password')
const expectedUrl = `${environment.baseUrl}/post`
const dateNow = new Date();
const testPost: Post[] =[{"id": 10001,"text": "Lorem ipsum","imageUrl": "","date": dateNow, "comments": [],"author": user  },
                      {"id": 10002,"text": "Lorem ipsum","imageUrl": "","date": dateNow, "comments": [],"author": user  },
                      {"id": 10003,"text": "Lorem ipsum","imageUrl": "","date": dateNow, "comments": [],"author": user  }];
                      //const testPostArray: Post[] = [testPost];
const post: Post = {"id": 10004,"text": "Lorem ipsum","imageUrl": "","date": dateNow, "comments": [],"author": user }
describe('PostService', () => {
  let service: PostService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PostService);
    controller = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('TestBed should be Truthy', () => {
    expect(TestBed).toBeTruthy();
  });
  it('should get all posts', () =>{
    service.getAllPosts().subscribe(posts=>{
      expect(posts.length).toBe(3);
      expect(posts).toEqual(testPost);
    });
    const req = controller.expectOne(`${expectedUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(testPost);
  })
  
  it('should get followedPosts', () =>{
    let followedPost: Post[]| any;
    service.getFollowedPosts(user).subscribe(posts =>{
        expect(posts).toBeTruthy();
        expect(posts).toBeDefined();
        followedPost= posts;
    })
      const req = controller.expectOne(`${expectedUrl}/followed/${user.id}`)
      req.flush(testPost)
      expect(testPost).toBeTruthy();
      expect(testPost).toEqual(followedPost)
    
  })
  it('should get post by id', () =>{
    let postById: Post|any
    service.getPostById().subscribe(posts=>{
      expect(posts).toBeTruthy();
      postById=posts
    });
    const req = controller.expectOne(`${expectedUrl}`)
    req.flush(testPost)
    expect(postById).toEqual(testPost);
  })
  it('should update a post via PUT request', () =>{
    let tempPost: Post | any
    service.upsertPost(post).subscribe(posts=>{
      expect(posts).toBeTruthy();
      tempPost= posts
    })
    const req = controller.expectOne(`${expectedUrl}` ,tempPost)
    req.flush({tempPost:Post})
    expect(tempPost).toBeInstanceOf(Object)
  })
});
