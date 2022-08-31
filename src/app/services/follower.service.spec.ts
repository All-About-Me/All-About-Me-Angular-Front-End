import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { environment } from "src/environments/environment";
import User from "../models/User";

import { FollowerService } from "./follower.service";

const testUser = new User(5,"testuser@gmail.com",'Test','User','','','','','','',8,'password')
const testUser2 = new User(4,"testuser@gmail.com",'Test','User','','','','','','',5,'password')
const expectedUrl = `${environment.baseUrl}/follower`
const testUserArray: User[] = [testUser2];

describe("FollowerService", () => {
  let service: FollowerService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(FollowerService);
    controller = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it('gets a list of the users the current user follows', () => {
    let actualList:User[] | undefined
    service.getFollows(testUser).subscribe((otherList) => {
      actualList=otherList
    } )

    const request = controller.expectOne(`${expectedUrl}/following/${testUser.id}`);
    
    
    request.flush(testUserArray)

    expect(actualList).toEqual(testUserArray)

    controller.verify();
  });

  it('gets a list of the users who follow the current user', () => {
    let actualList:User[] | undefined
    service.getFollowers(testUser).subscribe((otherList) => {
      actualList=otherList
    } )

    const request = controller.expectOne(`${expectedUrl}/followers/${testUser.id}`);
    
    
    request.flush(testUserArray)

    expect(actualList).toEqual(testUserArray)

    controller.verify();
  })
});
