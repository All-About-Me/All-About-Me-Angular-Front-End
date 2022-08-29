import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import User from '../models/User';

import { AuthService } from './auth.service';


const user = new User(5,"testuser@gmail.com",'Test','User','','','','','','',8,'password')
const expectedUrl = `${environment.baseUrl}/auth`

describe('AuthService', () => {
  let service: AuthService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    });
   service = TestBed.inject(AuthService); 
   controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log the user in', () => {
    let email = 'testuser@gmail.com'
    let password = 'password'
    let actualUser:User | undefined;

    service.login(email,password)

    const request = controller.expectOne(`${expectedUrl}/login`);

    request.flush(user)

    expect(service.currentUser).toEqual(user)

    controller.verify()
  });
});
