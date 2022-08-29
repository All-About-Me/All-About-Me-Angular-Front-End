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

    service.login(email,password)

    const request = controller.expectOne(`${expectedUrl}/login`);

    request.flush(user)

    expect(service.currentUser).toEqual(user)

    controller.verify()
  });

  it('should log the user out', () => {
    service.logout()
    const request = controller.expectOne(`${expectedUrl}/logout`);
    expect(request).toBeTruthy();
  })

  it('should register a new user given an email, password, first name, and last name', () => {
    let actualUser:User | undefined;
    service.register('Test','User','testuser@gmail.com','password').subscribe((otherUser) => {
      actualUser =otherUser
    })
    const request = controller.expectOne(`${expectedUrl}/register`);
    request.flush(user)
    expect(actualUser).toEqual(user)
    controller.verify()

  })

  it('should get all users', () =>{
    let actualUser:User | undefined;
    service.viewAllUsers().subscribe((otherUser) => {
      actualUser =otherUser
    })
    const request = controller.expectOne(`${expectedUrl}`);
    request.flush(user)
    expect(actualUser).toEqual(user)
    controller.verify()
  })

  it('should change user\'s password', () =>{
    let actualUser:User | undefined;
    service.resetPassword(user).subscribe((otherUser) => {
      actualUser =otherUser
    })
    const request = controller.expectOne(`${expectedUrl}/resetPwd`);
    request.flush(user)
    expect(actualUser).toEqual(user)
    controller.verify()
  })
});